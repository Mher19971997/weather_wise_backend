import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@weather_wise_backend/src/app.module'; // Adjust path as needed
import { UserService } from '@weather_wise_backend/src/user/user.service';
import { ListResult, UUID } from '@weather_wise_backend/shared/src/sequelize/meta';
import { userDto } from '@weather_wise_backend/src/user/dto';
import { UserEntity } from '@weather_wise_backend/src/user/dto/output/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  const globalBearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYzYzODNmMzM5YTRiYzM0NWJlYmQ2OWVkMmZmYWE4MjQ5OGE2MDZmNjdkNWFiOGIxYTM2OThhYjg1NWE4ZjA2OWZmNjg1MjYiLCJpYXQiOjE3MjUwMjE5OTYsImV4cCI6MTc1NjU1Nzk5Nn0.vvvFgJI5M6SESNgAsOWhqLa7BQ9w49uRKJvBe9IJMdk';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get<UserService>(UserService);
    // Make sure to set the global prefix here if it’s not done in main.ts
    const appConf = { endpoint: 'api', version: 'v1' }; // Adjust according to your configuration
    app.setGlobalPrefix(`${appConf.endpoint}/${appConf.version}`);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/user should return a list of users', async () => {
    const filterDto: userDto.inputs.FilterUserInput = {
      queryMeta: {
        paginate: true
      }
    };

    await request(app.getHttpServer())
      .get('/api/v1/user') // No need to include the global prefix here
      .query(filterDto)
      .set('Authorization', `Bearer ${globalBearerToken}`)
  });

  it('GET /api/v1/user/profile should return the user profile', async () => {
    jest.spyOn(userService, 'getProfile').mockResolvedValue({}); // Mock appropriate response if needed
    console.log(globalBearerToken,"globalBearerToken");
    
    await request(app.getHttpServer())
      .get('/api/v1/user/profile') // No need to include the global prefix here
      .set('Authorization', `Bearer ${globalBearerToken}`)
      .expect(200)
      .expect((res) => {
        // Add any additional assertions if needed
      });
  });
});
