/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import fs from 'fs';
import { diskStorage } from 'multer';
import path, { join } from 'path';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  getRootPath = () => {
    return process.cwd();
  };

  ensureExistsSync(targetDirectory: string) {
    try {
      if (!fs.existsSync(targetDirectory)) {
        fs.mkdirSync(targetDirectory, { recursive: true });
        console.log('Directory created:', targetDirectory);
      }
    } catch (error) {
      console.error('Error creating directory:', error);
    }
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const ext = path.extname(file.originalname).toLowerCase();
          const folder = req?.headers?.folder_type ?? 'default';

          const isPDF = ext === '.pdf';
          const folderType = isPDF ? 'pdfs' : 'images';

          const relativePath = `public/${folder}/${folderType}`;
          const fullPath = join(this.getRootPath(), relativePath);

          this.ensureExistsSync(fullPath);
          cb(null, fullPath);
        },
        filename: (req, file, cb) => {
          const extName = path.extname(file.originalname);
          const baseName = path.basename(file.originalname, extName);
          const finalName = `${baseName}${extName}`;
          cb(null, finalName);
        },
      }),
    };
  }
}
