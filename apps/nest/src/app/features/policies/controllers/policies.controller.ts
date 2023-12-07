import { PolicyState } from '@can-it/types';
import {
  Body,
  Controller,
  Delete,
  ExecutionContext,
  Get,
  Post
} from '@nestjs/common';
import { PolicyService } from '../../../integrations/database/services/policy.service';
import { AllowTo, UsePolicyResolver } from '@can-it/nest';
import { ModuleRef } from '@nestjs/core';

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

  @Delete(':actor')
  @AllowTo('delete', 'POLICIES')
  @UsePolicyResolver(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (context: ExecutionContext, _thisModule: ModuleRef): PolicyState => {
      const req = context.switchToHttp().getRequest();

      return {
        allow: req.params['actor'] === 'ADMIN' ? [['delete', 'POLICIES']] : []
      };
    }
  )
  delete() {
    this.policyService.update({ allow: [] });
    return { message: 'Your permissions now is reset to empty, you need to add permission to fetching the cats'}
  }
}
