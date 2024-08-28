import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MailerOptions } from '@nestjs-modules/mailer';
import { UUID } from '@weather_wise_backend/shared/src/sequelize/meta';
import { FilterService } from '@weather_wise_backend/shared/src/sequelize/filter.service';
import { Configuration } from '@weather_wise_backend/service/src/model/configuration/configuration';

import { CreateConfigurationInput } from '@weather_wise_backend/src/configuration/dto/input/create-configuration.input';
import { UpdateConfigurationInput } from '@weather_wise_backend/src/configuration/dto/input/update-configuration.input';
import { FilterConfigurationInput } from '@weather_wise_backend/src/configuration/dto/input/filter-configuration.input';
import { ConfigurationOutput } from '@weather_wise_backend/src/configuration/dto/output/configuration.output';

@Injectable()
export class ConfigurationService {
  private readonly logger = new Logger(ConfigurationService.name);

  constructor(
    @InjectModel(Configuration)
    private readonly configurationModel: typeof Configuration,
    private readonly filterService: FilterService,
  ) {}

  async create(inputDto: CreateConfigurationInput): Promise<ConfigurationOutput | null> {
    const res = await this.configurationModel.create(inputDto, {});

    return this.findOne({ uuid: res.uuid });
  }

  async findAll(filter: FilterConfigurationInput): Promise<ConfigurationOutput[]> {
    const { queryMeta, filterMeta, ...filters } = filter;
    return this.configurationModel.findAll({
      where: this.filterService.filter<FilterConfigurationInput>({ ...filters, filterMeta }),
      ...this.filterService.calcPage(queryMeta),
    });
  }

  async findOne(filter: Partial<FilterConfigurationInput>): Promise<ConfigurationOutput | null> {
    const { queryMeta, filterMeta, ...filters } = filter;
    return this.configurationModel.findOne({
      where: this.filterService.filter<FilterConfigurationInput>({ ...filters, filterMeta }),
      raw: true,
    });
  }

  async getConfig(module: string, name: string, value?: any): Promise<ConfigurationOutput | null> {
    return this.findOne({ module, name, ...value });
  }

  async getEmailConfig<T = MailerOptions & { from: string }>(): Promise<T> {
    const defConf = await this.getEmailServiceConfig();
    return (await this.getConfig('lib', defConf.default))?.value as T;
  }

  async getEmailServiceConfig<T = { default: string; from: string }>(): Promise<T> {
    return (await this.getConfig('lib', 'nodemailer.service'))?.value as T;
  }

  async getRole<T = { operation: string; access: string[] }>(operation: string): Promise<T> {
    return (await this.getConfig('user', 'role', { 'value.operation': operation }))?.value as T;
  }

  async update(inputDto: UpdateConfigurationInput): Promise<ConfigurationOutput | null> {
    const { uuid, ...values } = inputDto;
    await this.configurationModel.update(values, { where: { uuid } });

    return this.findOne({ uuid });
  }

  async remove(uuid: UUID): Promise<ConfigurationOutput | null> {
    const res = await this.findOne({ uuid });
    if (!res) {
      return null;
    }

    await this.configurationModel.destroy({ where: { uuid } });
    return res;
  }
}
