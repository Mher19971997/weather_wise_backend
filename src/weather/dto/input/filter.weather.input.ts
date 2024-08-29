import { ApiProperty } from "@nestjs/swagger";
import { decorator } from "@weather_wise_backend/shared/src/decorator";

@decorator.ajv.Schema({
    type: 'object',
    $ref: 'CommonEntity',
    properties: {
        city: {
            type: 'string',
        },
        date: {
            type: 'string',
        },
    },
    required: ['city', 'date'],

})
export class FilterWeatherInput {
    @ApiProperty({ required: true })
    declare city?: string;
    @ApiProperty({ required: true })
    declare date?: string;
}
