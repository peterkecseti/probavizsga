
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Book } from 'Entity/books.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>
  ){}

  async findOne(condition: any): Promise<Book> {
    console.log('appService: ', condition) 
    return this.bookRepo.findOneBy(condition)
  }
}
