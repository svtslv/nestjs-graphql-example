import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { OmProduct } from '../objection/om.product';
import { CreateProductInput, ProductsInput, UpdateProductInput } from './products.typeDefs';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(OmProduct) private readonly productModel: typeof OmProduct) {}

  async getProduct(id: number) {
    return this.productModel
      .query()
      .where({ id })
      .first();
  }

  async getProducts(input: ProductsInput) {
    return this.productModel.getMany<OmProduct>(input);
  }

  async createProduct(input: CreateProductInput) {
    return this.productModel
      .query()
      .insert(input)
      .returning('*')
      .first();
  }

  async updateProduct(input: UpdateProductInput) {
    const { id, ...user } = input;
    return this.productModel
      .query()
      .patch(user)
      .where({ id })
      .returning('*')
      .first();
  }

  async deleteProduct(id) {
    return this.productModel
      .query()
      .deleteById(id)
      .returning('*')
      .first();
  }
}
