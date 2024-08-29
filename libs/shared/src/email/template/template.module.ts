import { Module } from '@nestjs/common';
import { TemplateService } from '@weather_wise_backend/shared/src/email/template/template.service';
import { ConfigurationModule } from '@weather_wise_backend/src/configuration/configuration.module';

@Module({
  imports: [ConfigurationModule],
  providers: [TemplateService],
  exports: [TemplateService],
})
export class TemplateModule {}