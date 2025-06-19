import { Type } from 'class-transformer';
import {
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

class BookDto {
  @IsString({ message: 'phai co dinh dang string' })
  @IsNotEmpty({ message: 'kh dc de trong' })
  _id: mongoose.Schema.Types.ObjectId; // hoặc ObjectId nếu mày xử lý bên Mongo

  @IsString({ message: 'phai co dinh dang string' })
  @IsNotEmpty({ message: 'kh dc de trong' })
  name: string;
}

export class CreateRatingDto {
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => BookDto)
  book: BookDto;

  @IsInt({ message: 'phai co dinh dang string' })
  @Min(1, { message: 'score tối thiểu 1' })
  @Max(5, { message: 'score tối đa 1' })
  @IsNotEmpty({ message: 'kh dc de trong' })
  score: string;
}
