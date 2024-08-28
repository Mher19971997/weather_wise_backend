import { ApiProperty } from '@nestjs/swagger';
import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { UUID } from '@weather_wise_backend/shared/src/sequelize/meta';
import { UserEntity } from '@weather_wise_backend/src/user/dto/output/user.entity';

@decorator.ajv.Schema({
  type: 'object',
  $ref: 'UserEntity',
})
export class UpdateUserInput extends UserEntity {}

@decorator.ajv.Schema({
  type: 'object',
  $ref: 'UserEntity',
  properties: {
    code: {
      type: 'string',
      minLength: 6,
      maxLength: 6,
    },
  },
})
export class SelfUpdateUserInput extends UserEntity {
  @ApiProperty({ required: false, readOnly: true, type: 'string' })
  declare userUuid?: UUID;
  @ApiProperty({ required: false })
  declare code: string;
}


@decorator.ajv.Schema({
  type: 'object',
  properties: {
    password: {
      type: 'string',
    },
  },
  required: ['password'],
})
export class CheckUserPasswordInput {
  @ApiProperty({ required: false, readOnly: true, type: 'string' })
  declare uuid?: UUID;
  @ApiProperty({ required: false, readOnly: true, type: 'string' })
  declare userUuid?: UUID;
  @ApiProperty({ required: true })
  declare password: string;
}
