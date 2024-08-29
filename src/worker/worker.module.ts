import { Module } from '@nestjs/common';
import { ContactModule } from '@weather_wise_backend/src/worker/contact/contact.module';

@Module({
  imports: [ContactModule]
})
export class WorkerModule { }