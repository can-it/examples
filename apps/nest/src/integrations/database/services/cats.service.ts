import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private cats = [
    { id: 'c1', name: 'kitty', ownerId: 'haile.vnm' },
    { id: 'c2', name: 'tom', ownerId: 'can-it.io' }
  ];

  getAll() {
    return this.cats;
  }

  get(id: string) {
    return this.cats.find(c => c.id === id);
  }

  delete(id: string) {
    this.cats = this.cats.filter(c => c.id !== id);
    return this.cats;
  }
}
