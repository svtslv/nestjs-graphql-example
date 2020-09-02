import { Module } from '@nestjs/common';
import { MinioModule } from '@svtslv/nestjs-minio';
import { ConfigService } from '../config/config.service';
import { FilesService } from './files.service';
import { FileResolver } from './files.resolver';

@Module({
  imports: [
    MinioModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          url: configService.MINIO_URL,
        },
      }),
    }),
  ],
  providers: [FilesService, FileResolver],
  exports: [FilesService],
})
export class FilesModule {}
