import { Relation, relationTypes, Table } from 'nestjs-objection';
import { ObjectionModel } from './objection.model';
import { OmUser } from './om.user';

// noinspection JSUnusedGlobalSymbols
@Table({ tableName: 'auth' })
export class OmAuth extends ObjectionModel {
  id: number;
  userId: number;
  accessToken: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  @Relation({
    modelClass: OmUser,
    relation: relationTypes.HasOneRelation,
    join: { from: 'auth.userId', to: 'users.id' },
  })
  user: OmUser;
}
