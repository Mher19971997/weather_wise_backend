import { Global, Module } from '@nestjs/common';
import { UserController } from '@weather_wise_backend/src/user/user.controller';
import { UserService } from '@weather_wise_backend/src/user/user.service';
import { UserSeedCommand } from './seed/user.seed.command';
import { CryptoService } from '@weather_wise_backend/shared/src/crypto/crypto.service';

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService, UserSeedCommand, CryptoService],
  exports: [UserService, UserSeedCommand]
})
export class UserModule { }
