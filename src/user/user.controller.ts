import * as c from '@nestjs/common';
import { UserService } from '@weather_wise_backend/src/user/user.service';
import { UUID } from '@weather_wise_backend/shared/src/sequelize/meta';
import { userDto } from '@weather_wise_backend/src/user/dto';
import { RolesGuard } from '@weather_wise_backend/src/auth/guards/roles.guard';
import { BearerUser, excludeFields } from '@weather_wise_backend/src/user/dto/output';
import { decorator } from '@weather_wise_backend/shared/src/decorator';

// @c.UseGuards(RolesGuard)
@c.Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @c.Get()
  async findAll(@c.Query() filterDto: userDto.inputs.FilterUserInput) {
    console.log(1141);
    
    return this.userService.findAll({ ...filterDto, attributeMeta: { ...filterDto.attributeMeta, exclude: excludeFields } });
  }

  @c.Get('profile')
  getProfile(@decorator.user.User() user: BearerUser) {
    return this.userService.getProfile(user);
  }

  @c.Get(':uuid')
  async findOne(@c.Param('uuid') uuid: UUID, @c.Query() filterDto: userDto.inputs.FilterUserInput) {
    return this.userService.findOne({ uuid: uuid, attributeMeta: { exclude: excludeFields },  ...filterDto });
  }

  @c.Patch(':uuid')
  async update(@c.Param('uuid') uuid: UUID, @c.Body() inputDto: userDto.inputs.UpdateUserInput) {
    return this.userService.update({ uuid }, inputDto);
  }

  @c.Delete(':uuid')
  async remove(@c.Param('uuid') uuid: UUID) {
    return this.userService.remove({ uuid });
  }
}
