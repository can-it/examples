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

  updateName(id: string, name: string) {
    this.cats = this.cats.map(cat => {
      if (cat.id === id) {
        return { ...cat, name };
      }

      return cat;
    });

    return this.cats.find(c => c.id === id);
  }

  delete(id: string) {
    const cat = this.cats.find(c => c.id === id);
    this.cats = this.cats.filter(c => c.id !== id);

    return cat;
  }
}
