import { Injectable, Logger } from '@nestjs/common';
import OpenWeatherMap from 'openweathermap-ts';
import { ConfigService } from '@weather_wise_backend/shared/src/config/config.service';

@Injectable()
export class OpenweatherService {
  private client: OpenWeatherMap;
  private readonly logger = new Logger(OpenweatherService.name);

  constructor(
    private readonly configService: ConfigService,

  ) {
    this.client = new OpenWeatherMap(this.configService.get('service.openweather'));
  }

  async getCurrentWeatherByCityName(cityName: string) {
    return this.client.getCurrentWeatherByCityName({ cityName });
  }
}