import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilterService } from '@weather_wise_backend/shared/src/sequelize/filter.service';
import { CommonService } from '@weather_wise_backend/shared/src/sequelize/common.service';
import { Contact } from '@weather_wise_backend/service/src/model/contacts/contacts';
import { CreateContactInput } from '@weather_wise_backend/src/contact/dto/input/create-contact.input';
import { FilterContactInput } from '@weather_wise_backend/src/contact/dto/input/filter-contact.input';
import { UpdateContactInput } from '@weather_wise_backend/src/contact/dto/input/update-contact.input';
import { ContactEntity } from '@weather_wise_backend/src/contact/dto/output/contact.entity';
import { ConfigService } from '@weather_wise_backend/shared/src/config/config.service';
import { CryptoService } from '@weather_wise_backend/shared/src/crypto/crypto.service';

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
  ) {
    super({ model: contactModel, paginateService });
  }
}
