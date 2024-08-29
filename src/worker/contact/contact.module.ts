import { Global, Module } from '@nestjs/common';
import { ContactController } from '@weather_wise_backend/src/worker/contact/contact.controller';
import { ContactService } from '@weather_wise_backend/src/worker/contact/contact.service';
import { NodemailerModule } from '@weather_wise_backend/shared/src/email/nodemailer/nodemailer.module';
import { AmqpModule } from '@weather_wise_backend/shared/src/amqp/amqp.module';
import { UserModule } from '@weather_wise_backend/src/user/user.module';
import { ConfigurationModule } from '@weather_wise_backend/src/configuration/configuration.module';

@Global()
@Module({
  imports: [NodemailerModule, AmqpModule, UserModule, ConfigurationModule],
  providers: [ContactService],
  controllers: [ContactController],
  exports: [ContactService],
})
export class ContactModule {}