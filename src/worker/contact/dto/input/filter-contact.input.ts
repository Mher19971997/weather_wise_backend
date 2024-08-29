import { Util } from '@weather_wise_backend/shared/src/util/util';
import { FilterInput } from '@weather_wise_backend/shared/src/sequelize/meta';
import { ContactEntity } from '@weather_wise_backend/src/worker/contact/dto/output/contact.entity';

export class FilterContactInput extends Util.mixin<ContactEntity, FilterInput>(ContactEntity, FilterInput) {
  declare value?: string;
  declare info?: any;
}