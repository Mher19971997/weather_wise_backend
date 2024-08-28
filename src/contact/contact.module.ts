import { Global, Module } from '@nestjs/common';
import { CryptoService } from '@weather_wise_backend/shared/src/crypto/crypto.service';
import { ContactController } from '@weather_wise_backend/src/contact/contact.controller';
import { ContactService } from '@weather_wise_backend/src/contact/contact.service';

@Global()
@Module({
  providers: [ContactService, CryptoService],
  exports: [ContactService, CryptoService],
  controllers: [ContactController]
})
export class ContactModule {}
