import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { AllowTo, CanItGuard, CanItService, UsePolicyResolver } from '@can-it/nest';
import { CanIt } from '@can-it/core';

@Controller()
@UseGuards(CanItGuard)
@UsePolicyResolver(() => ({ allow: [['view', 'app']]}))
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowTo('view', 'app')
  getData(@CanItService() canIt: CanIt) {
    // useless code, just for showing how to use @CanItService decorator
    console.log(canIt.allowTo('edit', 'app'));

    return this.appService.getData();
  }
}
