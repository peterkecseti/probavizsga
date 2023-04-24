import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book } from 'Entity/books.entity';
import { Rentals } from 'Entity/rentals.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'books',
      entities: [
        Book, Rentals
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Book, Rentals])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
