import { ApiProperty } from '@nestjs/swagger';
import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { constants } from '@weather_wise_backend/shared/src/config/constants';

export class SendContactOptions {
  @ApiProperty({ required: true })
  to: string;
  @ApiProperty({ required: false })
  subject: string;
  @ApiProperty({ required: true })
  data: string;
  @ApiProperty({ required: false })
  type: string;
}

@decorator.ajv.Schema({
  type: 'object',
  properties: {
    job: {
      type: 'string',
      enum: [
        constants.CHANGE_EMAIL,
        constants.VERIFY_PHONE_NUMBER,
        constants.VERIFY_EMAIL,
        constants.FORGET_PASSWORD,
        constants.CHANGE_PASSWORD,
        constants.ACCOUNT_REACTIVATION,
        constants.ACCOUNT_DEACTIVATION
      ],
    },
    body: {
      type: 'object',
      properties: {
        to: {
          type: 'string',
        },
        code: {
          type: 'string',
        },
      },
      required: ['to', 'code'],
    },
  },
  required: ['job', 'body'],
})
export class SendContactInput {
  @ApiProperty({
    required: true,
    enum: [
      constants.CHANGE_EMAIL,
      constants.VERIFY_PHONE_NUMBER,
      constants.VERIFY_EMAIL,
      constants.FORGET_PASSWORD,
      constants.CHANGE_PASSWORD,
      constants.ACCOUNT_REACTIVATION,
      constants.ACCOUNT_DEACTIVATION
    ],
  })
  job: string;
  @ApiProperty({ required: true })
  body: SendContactOptions;
}

@decorator.ajv.Schema({
  type: 'object',
  properties: {
    channel: {
      type: 'string',
    },
    to: {
      type: 'string',
    },
    code: {
      type: 'string',
    },
    type: {
      type: 'string',
      enum: [constants.EMAIL, constants.PHONE],
    },
  },
})
export class VerificationInput {
  channel?: string;
  to?: string;
  code?: string;
  type?: string;
}
