import { Module } from '@nestjs/common';
import { SharedService } from '@weather_wise_backend/shared/src/shared.service';

@Module({
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
