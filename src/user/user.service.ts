import { Injectable } from '@nestjs/common';
import * as st from '@nestjs/sequelize';

import { CommonService } from '@weather_wise_backend/shared/src/sequelize/common.service';
import { FilterService } from '@weather_wise_backend/shared/src/sequelize/filter.service';

import { User } from '@weather_wise_backend/service/src/model/user/user';
import { userDto } from '@weather_wise_backend/src/user/dto';
import { ConfigService } from '@weather_wise_backend/shared/src/config/config.service';
import { CryptoService } from '@weather_wise_backend/shared/src/crypto/crypto.service';
import { BearerUser } from './dto/output';
import { UUID } from '@weather_wise_backend/shared/src/sequelize/meta';
import { AmqpService } from '@weather_wise_backend/shared/src/amqp/amqp.service';
import { constants } from '@weather_wise_backend/shared/src/config/constants';
import { l10n } from '@weather_wise_backend/shared/src/config/l10n-constants';
import assert from 'assert';

@Injectable()
export class UserService extends CommonService<
  User,
  userDto.inputs.CreateUserInput,
  userDto.inputs.FilterUserInput,
  userDto.inputs.UpdateUserInput,
  userDto.outputs.UserEntity
> {

  constructor(
    @st.InjectModel(User)
    private readonly userModel: typeof User,
    private readonly paginateService: FilterService,
    private readonly configService: ConfigService,
    private readonly cryptoService: CryptoService,
    private readonly amqpService: AmqpService,

  ) {
    super({ model: userModel, paginateService });
  }


  async getProfile(user: BearerUser) {
    return this.findOne({ uuid: user.userUuid, attributeMeta: { exclude: userDto.outputs.excludeFields } });
  }

  async create(inputDto: userDto.inputs.CreateUserInput) {
    const res = await super.create(inputDto);
    return this.findOne({ uuid: res.uuid, attributeMeta: { exclude: userDto.outputs.excludeFields } });
  }

  async update(filter: userDto.inputs.FilterUserInput, inputDto: userDto.inputs.UpdateUserInput) {
    await super.update(filter, inputDto);

    return this.findOne({ uuid: filter.uuid, attributeMeta: { exclude: userDto.outputs.excludeFields } });
  }


  async password(userDto: Partial<userDto.inputs.CreateUserInput>) {
    const secret = `${this.configService.get<string>('crypto.pbkdf2.secret')}`;
    if (!userDto.password) {
      return null;
    }

    const password = await this.cryptoService.hashPassword(userDto.password, secret);
    return { ...userDto, secret, password } as userDto.outputs.UserEntity;
  }

  async incrementRequestCount(uuid: UUID) {
    const user = await super.findOne({ uuid });

    if (+user.requestLimit <= +user.requestCount) {
      await this.amqpService.send(constants.EXCHANGE_WORKER, `/send/${constants.USER_LIMIT_EXCEEDED}`, {
        to: user.email,
        message: l10n.expired_limit
      });
      assert(false, l10n.expired_limit)
    }

    return await this.update({ uuid }, { requestCount: +user.requestCount + 1 });
  }
}
