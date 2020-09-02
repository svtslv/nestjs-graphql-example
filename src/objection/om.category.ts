import { Table } from 'nestjs-objection';
import { ObjectionModel } from './objection.model';

// noinspection JSUnusedGlobalSymbols
@Table({ tableName: 'categories', softDelete: true })
export class OmCategory extends ObjectionModel {
  id: number;
  name: string;
  description: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
