import { DynamicModule, Module } from '@nestjs/common';
import { UserEntry } from '@weather_wise_backend/service/src/model/user/user';
import { ConfigurationEntry } from '@weather_wise_backend/service/src/model/configuration/configuration';
import { ContactEntry } from '@weather_wise_backend/service/src/model/contacts/contacts';

const models: DynamicModule[] = [UserEntry, ConfigurationEntry, ContactEntry];

@Module({
  imports: models,
  exports: models
})
export class ModelModule {}
