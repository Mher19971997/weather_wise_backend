import { ContactEntity } from '@weather_wise_backend/src/contact/dto/output/contact.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateContactInput extends ContactEntity {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  declare value: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  declare type: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  declare info: any;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  declare code: any;
}
