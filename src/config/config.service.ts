import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  IS_DEV = Boolean(process.env.IS_DEV);
  UPLOADS_URL = process.env.UPLOADS_URL;
  MINIO_URL = process.env.MINIO_URL;
  DATABASE_URL = process.env.DATABASE_URL;
  JWT_SECRET = process.env.JWT_SECRET;
}
