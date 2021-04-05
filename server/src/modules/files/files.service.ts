import { promises as fs } from 'fs';
import { resolve, extname } from 'path';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Express } from 'express';
import { v4 as uuid } from 'uuid';

import { FileResponseDto } from 'modules/files/file.response.dto';

const DEST = 'uploads';

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
    const folder = resolve(DEST);

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

  async getExtension(file: Express.Multer.File): Promise<string> {
    const filePath = resolve(DEST, file.originalname);
    return extname(filePath);
  }

  async saveFile(file: Express.Multer.File, id: string): Promise<string> {
    await this.checkDestination();
    const ext = await this.getExtension(file);
    const fileName = `${id}${ext}`;

    const filePath = resolve(DEST, fileName);
    try {
      await fs.writeFile(filePath, file.buffer);
    } catch (err) {
      throw new InternalServerErrorException(`Cannot upload file: ${err?.message}`);
    }

    const fileURL = `${DEST}/${fileName}`;
    return fileURL;
  }
}
