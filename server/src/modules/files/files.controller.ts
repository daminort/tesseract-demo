import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { FileResponseDto } from 'modules/files/file.response.dto';
import { FilesService } from 'modules/files/files.service';

@Controller('api/files')
export class FilesController {
  constructor(
    private filesService: FilesService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<FileResponseDto> {
    return this.filesService.uploadFile(file);
  }
}
