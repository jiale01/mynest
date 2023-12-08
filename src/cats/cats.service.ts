import { Injectable } from '@nestjs/common';

interface Cat {
  [prop: string]: any;
}

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] | any {
    return this.cats + 'test';
  }
}
