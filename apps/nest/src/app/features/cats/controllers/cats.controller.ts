import { CanIt, UseRiResolver } from '@can-it/nest';
import {
  Body,
  Controller,
  Delete,
  ExecutionContext,
  Get,
  Param,
  Patch
} from '@nestjs/common';
import { CatsService } from '../../../integrations/database/services/cats.service';
import { ModuleRef } from '@nestjs/core';

@Controller('cats')
@CanIt('view')
export class CatsController {
  constructor(
    private catsService: CatsService
  ) {}

  // This method will still be applied the guard from controller CanIt above
  @Get()
  get() {
    return this.catsService.getAll();
  }

  @Get(':id')
  // The using of @UseRiResolver bellow will return the "cats" as resource identitfy
  // you can implement your logic base on context object or get provided service via the ModuleRef object.
  // That return values will combine with the "view" action provided from CanIt controller scope above
  @UseRiResolver(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_context: ExecutionContext, _thisModule: ModuleRef) => 'cats'
  )
  getOne(@Param('id') id: string) {
    return this.catsService.get(id);
  }

  @Patch(':id')
  @CanIt('edit', 'cats')
  update(@Param('id') id: string, @Body('name') name: string) {
    return this.catsService.updateName(id, name);
  }

  @Delete(':id')
  @CanIt('delete', 'cats')
  delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}
