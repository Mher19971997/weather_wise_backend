import { AppModule } from '@weather_wise_backend/src/app.module';
import { startApp } from '@weather_wise_backend/service/src/index';

(async function bootstrap() {
  process.env['app.name'] = 'app-api';
  await startApp(AppModule, 'app-api');
})();
