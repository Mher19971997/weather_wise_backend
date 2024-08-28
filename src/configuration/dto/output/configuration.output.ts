import { CommonEntity } from '@weather_wise_backend/shared/src/sequelize/common-entity';

export class ConfigurationOutput<V = { [key: string]: any }> extends CommonEntity {
  declare module?: string;
  declare name?: string;
  value?: V;
}
