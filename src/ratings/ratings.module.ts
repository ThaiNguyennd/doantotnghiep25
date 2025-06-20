import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from './schemas/rating.schema';
import { BooksModule } from 'src/books/books.module';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService],
  imports: [
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }]),
    BooksModule,
  ],
})
export class RatingsModule {}
