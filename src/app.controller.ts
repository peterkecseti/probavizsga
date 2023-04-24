import { Body, Controller, Get, NotFoundException, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { CreateBookDto } from 'dto/book.dto';
import { Book } from 'Entity/books.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Post('/seed')
  seed(){
    const bookRepo = this.dataSource.getRepository(Book)
    for(let i = 0; i < 15; i++){
      const book = new Book()
      book.author = "Author"
      book.page_count = Math.floor(Math.random() * (200 - 20 + 1) + 20);
      book.publish_year = Math.floor(Math.random() * (2023 - 1800 + 1) + 1800);
      book.title = "Title"
      bookRepo.save(book)
    }
  }

  @Get('/api/books')
  async getBooks(){
    const bookRepo = await this.dataSource.getRepository(Book)
    return bookRepo.find()
  }

  @Post('/api/books')
  async addBook(@Body() CreateBookDto: CreateBookDto){
    const bookRepo = await this.dataSource.getRepository(Book)
    const book = new Book()
    book.author = CreateBookDto.author;
    book.page_count = CreateBookDto.page_count;
    book.publish_year = CreateBookDto.publish_year;
    book.title = CreateBookDto.title;
    bookRepo.save(book)
    return bookRepo.findOne({
      where:{},
    order: {id: 'DESC'}})
  }

  @Post("/api/books/:id/rent")
  async rentBook(@Param() id : number): Promise<Book>{
    if(!await this.appService.findOne(id)){
      throw new NotFoundException
    }
    return 
  }
}
