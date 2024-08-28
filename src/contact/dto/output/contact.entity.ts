import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { CommonEntity } from '@weather_wise_backend/shared/src/sequelize/common-entity';
import { ApiProperty } from '@nestjs/swagger';

@decorator.ajv.Schema({
  type: 'object',
  $ref: 'CommonEntity',
  properties: {
    value: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    info: {
      type: 'object',
    },
  },
})

export class ContactEntity extends CommonEntity {
  @ApiProperty({ required: false })
  declare value?: string;
  @ApiProperty({ required: false })
  declare type?: string;
  @ApiProperty({ required: false })
  declare info?: any;
}
