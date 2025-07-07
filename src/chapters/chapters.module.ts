import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chapter, ChapterSchema } from './schemas/chapter.schema';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]),
    BooksModule
  ],
  controllers: [ChaptersController],
  providers: [ChaptersService],
  exports: [
    MongooseModule, // 👈 Xuất model để module khác xài
  ],
})
export class ChaptersModule {}
