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
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto, @User() user: IUser) {
    console.log('>>> User Info: ', user);
    return this.tagsService.create(createTagDto, user);
  }

  @Public()
  @ResponseMessage('get all tags')
  @Get()
  findAll(
    @Query('page') currentPage: string,
    @Query('limit') limit: string,
    @Query() qs: string,
  ) {
    return this.tagsService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
    @User() user: IUser,
  ) {
    return this.tagsService.update(id, updateTagDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.tagsService.remove(id, user);
  }
}
