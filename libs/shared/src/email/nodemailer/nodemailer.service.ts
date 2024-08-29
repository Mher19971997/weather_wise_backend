import { Injectable, Logger } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { TemplateService } from '@weather_wise_backend/shared/src/email/template/template.service';
import { l10n } from '@weather_wise_backend/shared/src/config/l10n-constants';
import { json5 } from '@weather_wise_backend/shared/src/util/parser/json5';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class NodemailerService {
  private readonly logger = new Logger(NodemailerService.name);
  private transporter: any;
  private readonly templates: Map<any, any>;

  constructor(
    private readonly configService: ConfigService,
    private readonly templateService: TemplateService
  ) {
    queueMicrotask(() => this.loadConfig());
  }

  async sendEmailVeriicationCode(data: any | any, isMultiple?: boolean) {
    const template = await this.templateService.loadTemplate('verification')

    const msg = {
      to: data.to,
      from: l10n.email_from,
      subject: l10n.account_email_verification_subject,
      html: await template.get('verification')({ code: data.code }),
    }
    return this.transporter.sendMail(msg);
  }


  async loadConfig() {
    this.transporter = await nodemailer.createTransport(this.configService.get('service.nodemailer'));
    await this.transporter.verify((error: any, success: any) =>
      this.logger.log(
        error
          ? `MailerError: ${json5.stringify(error.message)}`
          : `Server is ready to take our messages`
      )
    );
  }
}