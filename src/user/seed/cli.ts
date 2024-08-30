import 'source-map-support/register';
import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import '@weather_wise_backend/shared/src/util/global';
import { UserSeedCommandModule } from './user.seed.module';

(async function bootstrap() {
  const app = await NestFactory.createApplicationContext(UserSeedCommandModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
})();
