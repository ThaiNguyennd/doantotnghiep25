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
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ResponseMessage('create a book')
  @Post()
  create(@Body() createBookDto: CreateBookDto, @User() user: IUser) {
    return this.booksService.create(createBookDto, user);
  }

  @Public()
  @ResponseMessage('get all book')
  @Get()
  findAll(
    @Query('page') currentPage: string,
    @Query('limit') limit: string,
    @Query() qs: string,
  ) {
    return this.booksService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @ResponseMessage('get a book  with id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @ResponseMessage('update a book')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @User() user: IUser,
  ) {
    console.log('>>>check user: ', user);
    return this.booksService.update(id, updateBookDto, user);
  }

  @ResponseMessage('remove a book')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.booksService.remove(id, user);
  }
}
