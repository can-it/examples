import { PolicyState } from '@can-it/types';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PolicyService } from 'apps/nest/src/integrations/database/services/policy.service';

@Controller('policies')
export class PoliciesController {
  constructor(
    private policyService: PolicyService
  ) {}

  @Get()
  get() {
    return this.policyService.get();
  }

  @Post()
  replace(@Body('policy') policy: PolicyState) {
    this.policyService.update(policy);
    return this.policyService.get();
  }
}
