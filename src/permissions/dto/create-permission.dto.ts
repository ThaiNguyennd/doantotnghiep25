import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'ko dc de trong' })
  name: string;

  @IsNotEmpty({ message: 'ko dc de trong' })
  apiPath: string;

  @IsNotEmpty({ message: 'ko dc de trong' })
  method: string;

  @IsNotEmpty({ message: 'ko dc de trong' })
  module: string;
}
