import { CanIt } from '@can-it/nest';
import { Controller, Delete, Get, Param } from '@nestjs/common';

@Controller('cats')
@CanIt('view')
export class CatsController {
  private cats = [
    { id: 'c1', name: 'kitty' },
    { id: 'c2', name: 'tom' }
  ];

  @Get()
  // @CanIt('view')
  get() {
    return this.cats;
  }

  @Get(':id')
  // @CanIt('view', 'cats')
  getOne(@Param('id') id: string) {
    return this.cats.find(c => c.id === id);
  }

  @CanIt('delete', 'cats')
  @Delete(':id')
  delete(@Param('id') id: string) {
    this.cats = this.cats.filter(c => c.id !== id);
    return this.cats;
  }
}
