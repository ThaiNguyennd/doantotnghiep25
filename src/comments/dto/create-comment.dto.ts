import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  book: string;

  @IsOptional()
  @IsMongoId()
  parent?: string;
}
