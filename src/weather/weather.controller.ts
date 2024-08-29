import * as c from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { RolesGuard } from '@weather_wise_backend/src/auth/guards/roles.guard';
import { WeatherService } from '@weather_wise_backend/src/weather/weather.service';
import { BearerUser } from '@weather_wise_backend/src/user/dto/output';
import { weatherDto } from '@weather_wise_backend/src/weather/dto';

@c.UseGuards(RolesGuard)
@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) { }

    @c.Get()
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    async getWeather(@c.Query() filterDto: weatherDto.inputs.FilterWeatherInput, @decorator.user.User() user: BearerUser) {
        return this.weatherService.getWeather(filterDto, user);
    }
}