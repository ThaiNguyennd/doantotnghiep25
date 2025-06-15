import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorator/customize';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, JPG, PNG and PDF files are allowed',
      );
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new BadRequestException('File too large. Maximum size is 10MB');
    }

    return {
      message: 'Upload thành công',
      filename: file.filename,
      path: file.path,
    };
  }
}
