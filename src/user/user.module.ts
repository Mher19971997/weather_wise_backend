import { Module } from '@nestjs/common';
import { UserController } from '@weather_wise_backend/src/user/user.controller';
import { UserService } from '@weather_wise_backend/src/user/user.service';
import { CryptoService } from '@weather_wise_backend/shared/src/crypto/crypto.service';
import { ConfigurationService } from '@weather_wise_backend/src/configuration/configuration.service';
import { JwtStrategy } from '@weather_wise_backend/src/auth/strategies/jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, CryptoService, ConfigurationService, JwtStrategy],
  exports: [UserService]
})
export class UserModule {}
