import { ApiProperty } from '@nestjs/swagger';
import { constants } from '@weather_wise_backend/shared/src/config/constants';
import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { UserEntity } from '@weather_wise_backend/src/user/dto/output/user.entity';

@decorator.ajv.Schema({
  type: 'object',
  $ref: 'UserEntity',
  required: ['roles', 'password'],
})
export class CreateUserInput extends UserEntity {
  @ApiProperty()
  declare email?: string;
  @ApiProperty()
  declare name?: string;
  @ApiProperty()
  declare phone?: string;
  @ApiProperty()
  declare surname?: string;
  @ApiProperty({ required: false, readOnly: true })
  declare secret?: string;
  @ApiProperty({ required: true, pattern: constants.PASSWORD_REGEXP })
  declare password?: string;
  @ApiProperty({
    required: true,
    isArray: true,
    enum: [constants.ADMIN_ROLE, constants.USER_ROLE, constants.MANAGER_ROLE],
  })
  declare roles: string[];
}
