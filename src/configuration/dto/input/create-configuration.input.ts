import { IsNotEmpty } from 'class-validator';
import { ConfigurationOutput } from '@weather_wise_backend/src/configuration/dto/output/configuration.output';

export class CreateConfigurationInput<T = { [key: string]: any }> extends ConfigurationOutput<T> {
  @IsNotEmpty()
  declare module: string;
  @IsNotEmpty()
  declare name: string;
  @IsNotEmpty()
  declare value: T;
}
