import { Global, Module } from '@nestjs/common';
import { CryptoService } from '@weather_wise_backend/shared/src/crypto/crypto.service';
import { ConfigurationController } from '@weather_wise_backend/src/configuration/configuration.controller';
import { ConfigurationService } from '@weather_wise_backend/src/configuration/configuration.service';

@Global()
@Module({
  providers: [ConfigurationService, CryptoService],
  exports: [ConfigurationService, CryptoService],
  controllers: [ConfigurationController]
})
export class ConfigurationModule {
  static forRoot(): import("@nestjs/common").Type<any> | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule> | import("@nestjs/common").ForwardReference<any> {
    throw new Error('Method not implemented.');
  }
}
