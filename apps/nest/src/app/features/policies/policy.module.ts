import { Module } from '@nestjs/common';
import { PoliciesController } from './controllers/policies.controller';

@Module({
  controllers: [PoliciesController],
})
export class PolicyModule {}
