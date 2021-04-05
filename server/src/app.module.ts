import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { FilesModule } from './modules/files/files.module';
import { SelectionsModule } from './modules/selections/selections.module';
import { AppController } from 'app.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      exclude: ['/api*'],
    }),
    FilesModule,
    SelectionsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
