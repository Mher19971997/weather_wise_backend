import { FilterInput } from '@weather_wise_backend/shared/src/sequelize/meta';
import { Util } from '@weather_wise_backend/shared/src/util/util';
import { ConfigurationOutput } from '@weather_wise_backend/src/configuration/dto/output/configuration.output';

export class FilterConfigurationInput extends Util.mixin<ConfigurationOutput, FilterInput>(
  ConfigurationOutput,
  FilterInput,
) {}
