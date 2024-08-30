import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module'; // Adjust the path as needed
import { WeatherService } from '@weather_wise_backend/src/weather/weather.service';
import { weatherDto } from '@weather_wise_backend/src/weather/dto';

describe('WeatherController (e2e)', () => {
  let app: INestApplication;
  let weatherService: WeatherService;
  const globalBearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTY2ODRmODM2YTVlNzY3NWJiODg0OTk4M2ZmYWFkMDQ4ZGY2MDZmM2M4NGY5OGIxOTMzYzBmZDgxMDVkNTU3OWZmOWQzMjYiLCJpYXQiOjE3MjUwMDgwMjUsImV4cCI6MTc1NjU0NDAyNX0.MTt-33r-_mo_yFJ1qZcS8W__NFhN6uX2hwFddEaaWpc';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Make sure to set the global prefix here if it’s not done in main.ts
    const appConf = { endpoint: 'api', version: 'v1' }; // Adjust according to your configuration
    app.setGlobalPrefix(`${appConf.endpoint}/${appConf.version}`);
    weatherService = moduleFixture.get<WeatherService>(WeatherService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Test the getWeather endpoint
  it('/api/v1/weather (GET) should return weather data', async () => {
    const filterDto: weatherDto.inputs.FilterWeatherInput = {
      city: 'Vanadzor',
      date: '30.08.24',
    };

    const mockWeatherData = {
      // Mock the response from the WeatherService
      city: 'Vanadzor',
      date: '30.08.24',
      // Add other weather data fields if needed
    };


    jest.spyOn(weatherService, 'getWeather').mockResolvedValue(mockWeatherData);

    await request(app.getHttpServer())
      .get('/api/v1/weather')
      .query(filterDto)
      .set('Authorization', `Bearer ${globalBearerToken}`) // Mock or provide a valid token
      .expect(200)
  });
});
