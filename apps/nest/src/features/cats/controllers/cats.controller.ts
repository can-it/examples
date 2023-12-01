import { CanIt, UseRiResolver } from '@can-it/nest';
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { CatsService } from '../../../integrations/database/services/cats.service';
import { Request } from 'express';

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
  @CanIt('view', 'cats')
  getOne(@Param('id') id: string) {
    return this.catsService.get(id);
  }

  // The using of @UseRiResolver bellow will return the "cats" as resource identitfy
  // you can implement your logic base on request object.
  // That return values will combine as the "view" action provided from CanIt controller scope above
  @UseRiResolver(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_req: Request) => 'cats'
  )
  @Patch(':id')
  update(@Param('id') id: string, @Body('name') name: string) {
    return this.catsService.updateName(id, name);
  }

  @Delete(':id')
  @CanIt('delete', 'cats')
  delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}
