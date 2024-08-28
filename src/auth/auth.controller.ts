import * as c from '@nestjs/common';
import { AuthService } from '@weather_wise_backend/src/auth/auth.service';
import { authDto } from '@weather_wise_backend/src/auth/dto';
import { RolesGuard } from '@weather_wise_backend/src/auth/guards/roles.guard';

@c.UseGuards(RolesGuard)
@c.Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @c.Patch('checkContact')
  async checkContact(@c.Body() inputDto: authDto.inputs.CheckContactInput) {
    return this.authService.checkContact(inputDto);
  }
  
  @c.Patch('verifyContact')
  async verifyContact(@c.Body() inputDto: authDto.inputs.VerifyContactInput) {
    return this.authService.verifyContact(inputDto);
  }
  
  @c.Post('login')
  async login(@c.Body() inputDto: authDto.inputs.LoginInput) {
    return this.authService.login(inputDto);
  }

  @c.Post('register')
  async register(@c.Body() inputDto: authDto.inputs.RegisterInput) {
    return this.authService.register(inputDto);
  }
}
