import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilterService } from '@weather_wise_backend/shared/src/sequelize/filter.service';
import { CommonService } from '@weather_wise_backend/shared/src/sequelize/common.service';
import { Contact } from '@weather_wise_backend/service/src/model/contacts/contacts';
import { CreateContactInput } from '@weather_wise_backend/src/worker/contact/dto/input/create-contact.input';
import { FilterContactInput } from '@weather_wise_backend/src/worker/contact/dto/input/filter-contact.input';
import { UpdateContactInput } from '@weather_wise_backend/src/worker/contact/dto/input/update-contact.input';
import { ContactEntity } from '@weather_wise_backend/src/worker/contact/dto/output/contact.entity';
import { ConfigService } from '@weather_wise_backend/shared/src/config/config.service';
import { CryptoService } from '@weather_wise_backend/shared/src/crypto/crypto.service';
import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { constants } from '@weather_wise_backend/shared/src/config/constants';
import { Channel, ConsumeMessage } from 'amqplib';
import { NodemailerService } from '@weather_wise_backend/shared/src/email/nodemailer/nodemailer.service';
import { message } from '@weather_wise_backend/shared/src/config/message.constants';

@Injectable()
export class ContactService extends CommonService<
  Contact,
  CreateContactInput,
  FilterContactInput,
  UpdateContactInput,
  ContactEntity
> {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    @InjectModel(Contact)
    private readonly contactModel: typeof Contact,
    private readonly paginateService: FilterService,
    private readonly configService: ConfigService,
    private readonly cryptoService: CryptoService,
    private readonly nodemailerService: NodemailerService,
  ) {
    super({ model: contactModel, paginateService });
  }

  @decorator.amqp.Consume(constants.QUEUE_USER_LIMIT_EXCEEDED, { noAck: false })
  async processSendVerificationCodeToEmail(data: any, msg: ConsumeMessage | null, channel: Channel) {
    let resp;
    try {
      // sendEmailExpireInfo
      resp = await this.nodemailerService.sendEmailExpireInfo(data);
      await this.create(
        // { value: data.to, type: constants.VERIFY_EMAIL },
        {
          value: data.to,
          type: constants.VERIFY_EMAIL,
          code: data.code,
          status: constants.STATUS_PENDING,
          info: { emailMessage: resp }
        },
      );
      this.logger.debug({ processVerifyEmail: resp });
      channel.ack(msg);
      return resp;
    } catch (e) {
      this.logger.error(e);
      channel.nack(msg);
      resp = e;
    }
  }
}