import { CanIt } from '@can-it/nest';
import { Body, Controller, Delete, Get, Param, Patch, ValidationPipe } from '@nestjs/common';
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

  @Patch(':id')
  @CanIt('edit', 'cats')
  update(@Param('id') id: string, @Body('name') name: string) {
    return this.catsService.updateName(id, name);
  }

  @CanIt('delete', 'cats')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}
