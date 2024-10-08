import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'

import { UserModule } from '@weather_wise_backend/src/user/user.module';
import { AuthModule } from '@weather_wise_backend/src/auth/auth.module';
import { ServiceModule } from '@weather_wise_backend/service/src/service.module';
import { ConfigModule } from '@weather_wise_backend/shared/src/config/config.module';
import { SequelizeModule } from '@weather_wise_backend/shared/src/sequelize/sequelize.module';
import { FilesModule } from '@weather_wise_backend/shared/src/files/files.module';
import { ConfigurationService } from '@weather_wise_backend/src/configuration/configuration.service';
import { CryptoService } from '@weather_wise_backend/shared/src/crypto/crypto.service';
import { JwtStrategy } from '@weather_wise_backend/src/auth/strategies/jwt.strategy';
import { OpenweatherModule } from '@weather_wise_backend/shared/src/openweather/openweather.module';
import { WeatherModule } from '@weather_wise_backend/src/weather/weather.module';
import { ConfigurationModule } from '@weather_wise_backend/src/configuration/configuration.module';
import { WorkerModule } from '@weather_wise_backend/src/worker/worker.module';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [
    ServiceModule.register(),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    ConfigModule.forRoot(),
    ConfigurationModule,
    AuthModule,
    UserModule,
    SequelizeModule,
    FilesModule,
    OpenweatherModule,
    WeatherModule,
    WorkerModule,
    CommandModule
  ],
  controllers: [],
  providers: [CryptoService, ConfigurationService, JwtStrategy],
})

export class AppModule { }