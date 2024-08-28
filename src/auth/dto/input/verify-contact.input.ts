import { ApiProperty } from '@nestjs/swagger';
import { constants } from '@weather_wise_backend/shared/src/config/constants';
import { decorator } from '@weather_wise_backend/shared/src/decorator';

@decorator.ajv.Schema({
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    code: {
      type: 'string',
    },
    type: {
      type: 'string',
      enum: [constants.FORGET_PASSWORD, constants.CHANGE_PHONE, constants.VERIFY_EMAIL,constants.ACCOUNT_REACTIVATION,constants.ACCOUNT_DEACTIVATION],
    },
  },
  required: ['email', 'code', 'type'],
})
export class VerifyContactInput {
  @ApiProperty()
  public code: string;
  @ApiProperty({ required: true })
  public email?: string;
  @ApiProperty({
    required: true,
    enum: [constants.FORGET_PASSWORD, constants.CHANGE_PHONE, constants.VERIFY_EMAIL, constants.ACCOUNT_REACTIVATION,constants.ACCOUNT_DEACTIVATION ],
  })
  public type: string;
}
