import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { v1 as uuidV1 } from 'uuid';
import { InjectMinioClient, MinioClient } from '@svtslv/nestjs-minio';
import { ConfigService } from '../config/config.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService,
    @InjectMinioClient() private readonly minioClient: MinioClient,
  ) {}

  async createFile(input) {
    const { name } = input;
    const ext = path.extname(name);
    const fileName = `${uuidV1()}${ext}`;
    const url = `${this.configService.UPLOADS_URL}/${fileName}`;
    const putUrl = await this.minioClient.presignedPutObject('uploads', fileName);

    return { url, putUrl };
  }
}
