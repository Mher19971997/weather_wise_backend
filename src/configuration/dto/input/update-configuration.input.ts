import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateConfigurationInput } from '@weather_wise_backend/src/configuration/dto/input/create-configuration.input';
import { UUID } from '@weather_wise_backend/shared/src/sequelize/meta';

export class UpdateConfigurationInput<T = { [key: string]: any }> extends PartialType(CreateConfigurationInput) {
  @IsNotEmpty()
  declare uuid: UUID;
  declare module: string;
  declare name: string;
  declare value: T;
}
