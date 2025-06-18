import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Public, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';


@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
   create(@Body() createCommentDto: CreateCommentDto, @User() user: IUser) {
    return this.commentsService.create(createCommentDto, user);
  }


  @Delete('/:id')
   delete(@Param('id') id: string, @User() user: IUser) {
    return this.commentsService.remove(id, user);
  }

  @Public()
  @Get('/book/:bookId')
   findByBook(@Param('bookId') bookId: string) {
    return this.commentsService.findAllByBook(bookId);
  }
}