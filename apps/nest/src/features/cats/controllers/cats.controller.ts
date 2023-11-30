import { CanIt } from '@can-it/nest';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CatsService } from '../../../integrations/database/services/cats.service';

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

  @CanIt('delete', 'cats')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}
