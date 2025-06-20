import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @User() user: IUser) {
    return this.commentsService.create(createCommentDto, user);
  }

  @ResponseMessage('update a cmt')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @User() user: IUser,
  ) {
    return this.commentsService.update(id, updateCommentDto, user);
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
