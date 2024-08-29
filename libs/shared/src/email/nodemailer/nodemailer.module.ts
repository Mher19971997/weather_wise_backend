import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { NodemailerService } from './nodemailer.service';
import { TemplateModule } from '../template/template.module';
import { ConfigurationModule } from '@weather_wise_backend/src/configuration/configuration.module';


@Module({
  imports: [ConfigModule, TemplateModule, ConfigurationModule],
  providers: [NodemailerService],
  exports: [NodemailerService]
})
export class NodemailerModule {}