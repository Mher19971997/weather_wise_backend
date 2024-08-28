import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'

import { UserModule } from '@weather_wise_backend/src/user/user.module';
import { AuthModule } from '@weather_wise_backend/src/auth/auth.module';
import { ContactModule } from '@weather_wise_backend/src/contact/contact.module';
import { ServiceModule } from '@weather_wise_backend/service/src/service.module';
import { ConfigModule } from '@weather_wise_backend/shared/src/config/config.module';
import { SequelizeModule } from '@weather_wise_backend/shared/src/sequelize/sequelize.module';
import { FilesModule } from '@weather_wise_backend/shared/src/files/files.module';
import { ConfigurationService } from './configuration/configuration.service';
import { CryptoService } from '@weather_wise_backend/shared/src/crypto/crypto.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    ServiceModule.register(),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ContactModule,
    SequelizeModule,
    FilesModule,
  ],
  controllers: [],
  providers: [CryptoService, ConfigurationService, JwtStrategy],
})

export class AppModule { }
