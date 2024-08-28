import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { constants } from '@weather_wise_backend/shared/src/config/constants';

@decorator.ajv.Schema({
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    type: {
      type: 'string',
      enum: [constants.VERIFY_EMAIL],
    },
  },
  required: ['email', 'type'],
})
export class CheckContactInput {
  @ApiProperty()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  public type: string;
}
