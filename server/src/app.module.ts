import { Module } from '@nestjs/common';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [FilesModule],
})
export class AppModule {}
