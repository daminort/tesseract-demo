import { promises as fs } from 'fs';
import { resolve } from 'path';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Express } from 'express';
import { v4 as uuid } from 'uuid';

import { UPLOADS_PATH, IMAGE_EXTENSION } from 'common/constants/files';
import { FileResponseDto } from 'modules/files/file.response.dto';

@Injectable()
export class FilesService {

  async uploadFile(file: Express.Multer.File): Promise<FileResponseDto> {

    const id = uuid();
    const url = await this.saveFile(file, id);

    return {
      id,
      url,
      name: file.originalname,
    }
  }

  async checkDestination(): Promise<void> {
    const folder = resolve(UPLOADS_PATH);

    let isExist = false;
    try {
      const stat = await fs.lstat(folder);
      if (stat.isDirectory()) {
        isExist = true;
      }
    } catch (err: unknown) {
      //
    }

    if (!isExist) {
      await fs.mkdir(folder);
    }
  }

  async saveFile(file: Express.Multer.File, id: string): Promise<string> {
    await this.checkDestination();
    const fileName = `${id}.${IMAGE_EXTENSION}`;

    const filePath = resolve(UPLOADS_PATH, fileName);
    try {
      await fs.writeFile(filePath, file.buffer);
    } catch (err) {
      throw new InternalServerErrorException(`Cannot upload file: ${err?.message}`);
    }

    const fileURL = `/${UPLOADS_PATH}/${fileName}`;
    return fileURL;
  }
}
