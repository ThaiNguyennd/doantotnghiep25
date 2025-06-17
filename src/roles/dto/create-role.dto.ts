import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'name kh đc để trống' })
  name: string;

  @IsNotEmpty({ message: 'des kh đc để trống' })
  des: string;

  @IsNotEmpty({ message: 'isActive kh dc de trong' })
  @IsBoolean({ message: 'phao co dang boolean' })
  isActive: boolean;

  @IsNotEmpty({ message: 'per kh dc de trong' })
  @IsMongoId({ each: true, message: 'each per is mongo obj id' })
  @IsArray({ message: 'per kh dc de trong' })
  permission: mongoose.Schema.Types.ObjectId[];
}
