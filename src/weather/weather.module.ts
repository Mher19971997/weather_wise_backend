import { Module } from '@nestjs/common';
import { WeatherService } from '@weather_wise_backend/src/weather/weather.service';
import { WeatherController } from '@weather_wise_backend/src/weather/weather.controller';
import { OpenweatherModule } from '@weather_wise_backend/shared/src/openweather/openweather.module';
import { CacheModule } from '@weather_wise_backend/shared/src/cache/cache.module';

@Module({
    imports: [OpenweatherModule, CacheModule],
    controllers: [WeatherController],
    providers: [WeatherService],
    exports: [WeatherService],
})
export class WeatherModule { }
