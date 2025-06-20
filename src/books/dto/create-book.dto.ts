import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class TagDto {
  @IsString({ message: 'phai co dinh dang string' })
  @IsNotEmpty({ message: 'kh dc de trong' })
  _id: mongoose.Schema.Types.ObjectId; // hoặc ObjectId nếu mày xử lý bên Mongo

  @IsString({ message: 'phai co dinh dang string' })
  @IsNotEmpty({ message: 'kh dc de trong' })
  name: string;
}
export class CreateBookDto {
  @IsString({ message: 'phai co dinh dang string' })
  @IsNotEmpty({ message: 'kh dc de trong' })
  title: string;

  @IsString({ message: 'phai co dinh dang string' })
  @IsNotEmpty({ message: 'kh dc de trong' })
  author: string;

  @IsString({ message: 'phai co dinh dang string' })
  @IsNotEmpty({ message: 'kh dc de trong' })
  cover: string;

  @IsString({ message: 'phai co dinh dang string' })
  description: string;

  @IsInt({ message: 'phai co dinh dang string' })
  @Min(1)
  @Max(5)
  averageRating: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => TagDto)
  tags: TagDto;

  @IsBoolean({ message: 'phai co dinh dang boolean' })
  isPremium: boolean;
}
