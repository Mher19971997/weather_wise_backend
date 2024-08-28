import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { FilterInput } from '@weather_wise_backend/shared/src/sequelize/meta';
import { Util } from '@weather_wise_backend/shared/src/util/util';
import { UserEntity } from '@weather_wise_backend/src/user/dto/output/user.entity';

@decorator.ajv.Schema({
  type: 'object',
  $ref: 'UserEntity',
})
export class FilterUserInput extends Util.mixin<UserEntity, FilterInput>(UserEntity, FilterInput) {}
