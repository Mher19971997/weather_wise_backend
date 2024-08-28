import { Global, Module } from '@nestjs/common';
import { CacheService } from '@weather_wise_backend/shared/src/cache/cache.service';
import { Redis } from '@weather_wise_backend/shared/src/cache/redis';

@Global()
@Module({
  providers: [CacheService, Redis],
  exports: [CacheService],
})
export class CacheModule {}
