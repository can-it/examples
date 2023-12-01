import { Global, Module } from '@nestjs/common';
import { CatsService } from './services/cats.service';
import { PolicyService } from './services/policy.service';

@Global()
@Module({
  providers: [CatsService, PolicyService],
  exports: [CatsService, PolicyService],
})
export class DatabaseModule {}
