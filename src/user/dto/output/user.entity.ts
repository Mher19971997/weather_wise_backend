import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from '@weather_wise_backend/shared/src/sequelize/common-entity';
import { constants } from '@weather_wise_backend/shared/src/config/constants';
import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { UUID } from '@weather_wise_backend/shared/src/sequelize/meta';
@decorator.ajv.Schema({
  type: 'object',
  $ref: 'CommonEntity',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    phone: {
      type: 'string',
      phoneNumber: true
    },
    userId: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 30,
      pattern: constants.PASSWORD_REGEXP,
    },
    roles: {
      type: 'array',
      items: {
        type: 'string',
        enum: [constants.ADMIN_ROLE, constants.USER_ROLE],
      },
    },
    secret: {
      type: 'string',
    },
  },
})
export class UserEntity extends CommonEntity {
  @ApiProperty({ required: false })
  declare email?: string;
  @ApiProperty({ required: false })
  declare phone?: string;
  @ApiProperty()
  declare name?: string;
  @ApiProperty()
  declare surname?: string;
  @ApiProperty()
  declare city?: string;
  @ApiProperty()
  declare street?: string;
  @ApiProperty()
  declare bilding_number?: string;
  @ApiProperty()
  declare apartment_suite?: string;
  @ApiProperty({ required: false, readOnly: true })
  declare password?: string;
  @ApiProperty({ required: false })
  declare roles?: string[];
  @ApiProperty({ required: false, readOnly: true })
  declare secret?: string;
}

export class BearerUser {
  userId: string;
  userUuid: UUID;
  authorization: string;
}
export const excludeFields = ['password', 'secret'];
