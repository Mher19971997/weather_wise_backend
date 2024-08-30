import { Injectable, Logger } from '@nestjs/common';
import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { OpenweatherService } from '@weather_wise_backend/shared/src/openweather/openweather.service';
import { weatherDto } from '@weather_wise_backend/src/weather/dto';
import { BearerUser } from '@weather_wise_backend/src/user/dto/output';
import { UserService } from '@weather_wise_backend/src/user/user.service';
import ms from 'ms';

@Injectable()
export class WeatherService {
    private readonly logger = new Logger(WeatherService.name);

    constructor(
        private readonly openweatherService: OpenweatherService,
        private readonly userService: UserService,
    ) { }

    @decorator.cache.Store({ ttl: ms('5 second') })
    async getWeather(filterDto: weatherDto.inputs.FilterWeatherInput, user: BearerUser): Promise<object> {
        const weatherData = await this.openweatherService.getCurrentWeatherByCityName(filterDto.city);

        await this.userService.incrementRequestCount(user.userUuid);

        return weatherData;
    }
}