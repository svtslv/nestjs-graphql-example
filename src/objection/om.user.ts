import { Table } from 'nestjs-objection';
import { ObjectionModel } from './objection.model';

// noinspection JSUnusedGlobalSymbols
@Table({ tableName: 'users', softDelete: true })
export class OmUser extends ObjectionModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
}
