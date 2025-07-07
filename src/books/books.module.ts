import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { Rating, RatingSchema } from 'src/ratings/schemas/rating.schema';
import { ChaptersModule } from 'src/chapters/chapters.module';
import { Chapter, ChapterSchema } from 'src/chapters/schemas/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Rating.name, schema: RatingSchema },
     { name: Chapter.name, schema: ChapterSchema },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService,  MongooseModule],
})
export class BooksModule {}
