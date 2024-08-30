import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ConfigModule } from '@weather_wise_backend/shared/src/config/config.module';
import { SequelizeModule } from '@weather_wise_backend/shared/src/sequelize/sequelize.module';
import { CryptoService } from '@weather_wise_backend/shared/src/crypto/crypto.service';
import { MigrationCommand } from '@weather_wise_backend/migration/src/command/migration.command';
import { MigrationService } from '@weather_wise_backend/migration/src/migration.service';
import { MigrationEntry } from '@weather_wise_backend/migration/src/command/repository/migration.repository';

@Module({
  imports: [
    CommandModule,
    ConfigModule.forRoot(),
    SequelizeModule,
    // CryptoService,
    MigrationEntry,
  ],
  providers: [CryptoService, MigrationCommand, MigrationService],
})
export class MigrationModule {}

