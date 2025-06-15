import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @ResponseMessage('create chapter')
  @Post()
  create(@Body() createChapterDto: CreateChapterDto, @User() user: IUser) {
    return this.chaptersService.create(createChapterDto, user);
  }

  @Public()
  @ResponseMessage('get chapter')
  @Get()
  findAll(
    @Query('page') currentPage: string,
    @Query('limit') limit: string,
    @Query() qs: string,
  ) {
    return this.chaptersService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @ResponseMessage('get a chap  with id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chaptersService.findOne(id);
  }

  @ResponseMessage('update a chap')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChapterDto: UpdateChapterDto,
    @User() user: IUser,
  ) {
    return this.chaptersService.update(id, updateChapterDto, user);
  }

  @ResponseMessage('delete a chap')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.chaptersService.remove(id, user);
  }

  @Public()
  @ResponseMessage('find by book')
  @Get('by-book/:bookId')
  findByBook(@Param('bookId') bookId: string) {
    return this.chaptersService.findByBook(bookId);
  }
}
