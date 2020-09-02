import { Field, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Category } from '../categories/categories.typeDefs';

@ObjectType()
export class Product {
  @Field(() => Int, { nullable: false })
  id: number;
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: false })
  description: string;
  @Field(() => String, { nullable: false })
  image: string;
  @Field(() => Int, { nullable: false })
  categoryId: number;
  @Field(() => Boolean, { nullable: false })
  published: boolean;
  @Field(() => Category, { nullable: true })
  category: Category;
}

@ObjectType()
export class Products {
  @Field(() => [Product], { nullable: true })
  nodes?: Product[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@InputType()
export class CreateProductInput {
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: false })
  description: string;
  @Field(() => String, { nullable: false })
  image: string;
  @Field(() => Int, { nullable: false })
  categoryId: number;
  @Field(() => Boolean, { nullable: false })
  published: boolean;
}

@InputType()
export class UpdateProductInput {
  @Field(() => Int, { nullable: false })
  id: number;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  image?: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => Int, { nullable: true })
  categoryId?: number;
  @Field(() => Boolean, { nullable: true })
  published?: boolean;
}

export enum ProductColumnEnum {
  'id' = 'id',
  'name' = 'name',
  'description' = 'description',
  'image' = 'image',
  'categoryId' = 'categoryId',
  'published' = 'published',
}

// noinspection JSUnusedGlobalSymbols
export enum ProductOrderEnum {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

export enum ProductOperationEnum {
  'equals' = '=',
  'like' = 'like',
  'ilike' = 'ilike',
}

registerEnumType(ProductColumnEnum, { name: 'ProductColumnEnum' });
registerEnumType(ProductOrderEnum, { name: 'ProductOrderEnum' });
registerEnumType(ProductOperationEnum, { name: 'ProductOperationEnum' });

@InputType()
export class ProductsFilter {
  @Field(() => ProductColumnEnum, { nullable: false })
  column: ProductColumnEnum;
  @Field(() => ProductOperationEnum, { nullable: false })
  operation: ProductOperationEnum;
  @Field(() => String, { nullable: false })
  expression: string;
}

@InputType()
export class ProductsOrderBy {
  @Field(() => ProductOrderEnum, { nullable: false })
  order: ProductOrderEnum;
  @Field(() => ProductColumnEnum, { nullable: false })
  column: ProductColumnEnum;
}

@InputType()
export class ProductsInput {
  @Field(() => Int, { nullable: true })
  limit?: number;
  @Field(() => Int, { nullable: true })
  offset?: number;
  @Field(() => [ProductsOrderBy], { nullable: true })
  orderBy?: ProductsOrderBy[];
  @Field(() => [ProductsFilter], { nullable: true })
  filters?: ProductsFilter[];
}
