/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty } from 'class-validator';
export class CreateTagDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
