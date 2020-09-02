import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { OmCategory } from '../objection/om.category';
import { CategoriesInput, CreateCategoryInput, UpdateCategoryInput } from './categories.typeDefs';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(OmCategory) private readonly categoryModel: typeof OmCategory) {}

  async getCategory(id: number) {
    return this.categoryModel
      .query()
      .where({ id })
      .first();
  }

  async getCategories(input: CategoriesInput) {
    return this.categoryModel.getMany<OmCategory>(input);
  }

  async createCategory(input: CreateCategoryInput) {
    return this.categoryModel
      .query()
      .insert(input)
      .returning('*')
      .first();
  }

  async updateCategory(input: UpdateCategoryInput) {
    const { id, ...user } = input;
    return this.categoryModel
      .query()
      .patch(user)
      .where({ id })
      .returning('*')
      .first();
  }

  async deleteCategory(id) {
    return this.categoryModel
      .query()
      .deleteById(id)
      .returning('*')
      .first();
  }
}
