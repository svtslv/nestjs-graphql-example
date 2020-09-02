import { Relation, relationTypes, Table } from 'nestjs-objection';
import { ObjectionModel } from './objection.model';
import { OmCategory } from './om.category';

// noinspection JSUnusedGlobalSymbols
@Table({ tableName: 'products', softDelete: true })
export class OmProduct extends ObjectionModel {
  id: number;
  name: string;
  description: string;
  image: string;
  categoryId: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  @Relation({
    modelClass: OmCategory,
    relation: relationTypes.HasOneRelation,
    join: { from: 'products.categoryId', to: 'categories.id' },
  })
  category: OmCategory;
}
