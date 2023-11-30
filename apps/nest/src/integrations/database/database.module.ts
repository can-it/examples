import { Global, Module } from '@nestjs/common';
import { CatsService } from './services/cats.service';

@Global()
@Module({
  providers: [CatsService],
  exports: [CatsService]
})
export class DatabaseModule {}
