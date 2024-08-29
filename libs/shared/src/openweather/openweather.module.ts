import { Global, Module } from "@nestjs/common";
import { OpenweatherService } from "@weather_wise_backend/shared/src/openweather/openweather.service";

@Global()
@Module({
    providers: [OpenweatherService],
    exports: [OpenweatherService]
})
export class OpenweatherModule { }