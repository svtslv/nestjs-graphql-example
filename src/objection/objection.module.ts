import { Global, Module } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Connection, InjectConnection, ObjectionModule as SvtslvObjectionModule } from 'nestjs-objection';
import { ObjectionModel } from './objection.model';

import { OmAuth } from './om.auth';
import { OmProduct } from './om.product';
import { OmUser } from './om.user';
import { OmCategory } from './om.category';

const MODELS = [OmAuth, OmUser, OmProduct, OmCategory];

@Global()
@Module({
  imports: [
    SvtslvObjectionModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        Model: ObjectionModel,
        config: {
          connection: configService.DATABASE_URL,
          client: 'pg',
        },
      }),
    }),
    SvtslvObjectionModule.forFeature(MODELS),
  ],
  exports: [SvtslvObjectionModule],
})
export class ObjectionModule {
  constructor(
    private readonly configService: ConfigService,
    @InjectConnection() private readonly connection: Connection,
  ) {
    if (this.configService.IS_DEV) {
      this.connection.on('query', query =>
        console.log('[Objection]', {
          date: new Date(),
          sql: query.sql,
          bindings: query.bindings,
        }),
      );
    }
  }
}
