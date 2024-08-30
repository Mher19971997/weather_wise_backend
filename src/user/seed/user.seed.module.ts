import { Global, Module } from '@nestjs/common';
import { UserSeedCommand } from './user.seed.command';
import { CommandModule } from 'nestjs-command';
import { ConfigModule } from '@weather_wise_backend/shared/src/config/config.module';
import { SequelizeModule } from '@weather_wise_backend/shared/src/sequelize/sequelize.module';
import { UserEntry } from '@weather_wise_backend/service/src/model/user/user';
import { AuthModule } from '@weather_wise_backend/auth/auth.module';
import { UserModule } from '../user.module';
import { ServiceModule } from '@weather_wise_backend/service/src/service.module';
import { CryptoService } from '@weather_wise_backend/shared/src/crypto/crypto.service';
import { AmqpModule } from '@weather_wise_backend/shared/src/amqp/amqp.module';
import { ConfigurationService } from '@weather_wise_backend/src/configuration/configuration.service';
import { ConfigurationModule } from '@weather_wise_backend/src/configuration/configuration.module';

@Module({
    imports: [
        AuthModule,
        AmqpModule,
        UserModule,
        CommandModule,
        ConfigModule.forRoot(),
        ServiceModule.register(),
        SequelizeModule,
        // CryptoService,
        ConfigurationModule,
        UserEntry,
    ],
    controllers: [],
    providers: [UserSeedCommand, CryptoService, ConfigurationService],
    exports: [UserSeedCommand]
})
export class UserSeedCommandModule { }
