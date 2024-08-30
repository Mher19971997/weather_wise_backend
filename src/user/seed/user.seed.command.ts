import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { authDto } from '@weather_wise_backend/auth/dto';
import { AuthService } from '@weather_wise_backend/src/auth/auth.service';

@Injectable()
export class UserSeedCommand {
  constructor(private readonly authService: AuthService) { }

  @Command({
    command: 'create:users',
    describe: 'create users',
  })
  async create(
  ) {
    for (let i = 0; i < 10; i++) {
      const email = faker.internet.email();
      const password = '12345678';

      const registerInput: authDto.inputs.RegisterInput = {
        email,
        password,
      };

      await this.authService.register(registerInput);
      console.log(`Created user with email: ${email}`);
    }

    // Manually exit the process after the command completes
    process.exit(0);
  }
}
