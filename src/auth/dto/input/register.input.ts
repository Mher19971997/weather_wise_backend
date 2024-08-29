import { ApiProperty } from '@nestjs/swagger';
import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { constants } from '@weather_wise_backend/shared/src/config/constants';

@decorator.ajv.Schema({
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 30,
      pattern: constants.PASSWORD_REGEXP,
    },
  },
  required: ['email', 'password'],
})
export class RegisterInput {
  @ApiProperty()
  public email?: string;
  @ApiProperty()
  public password?: string;
}