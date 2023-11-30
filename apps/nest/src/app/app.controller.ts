import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { CanIt } from '@can-it/nest';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
