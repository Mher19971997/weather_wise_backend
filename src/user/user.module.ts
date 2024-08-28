import { Global, Module } from '@nestjs/common';
import { UserController } from '@weather_wise_backend/src/user/user.controller';
import { UserService } from '@weather_wise_backend/src/user/user.service';

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
