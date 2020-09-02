import { Field, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => Int, { nullable: false })
  id: number;
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: false })
  description: string;
  @Field(() => Boolean, { nullable: false })
  published: boolean;
}

@ObjectType()
export class Categories {
  @Field(() => [Category], { nullable: true })
  nodes?: Category[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: false })
  description: string;
  @Field(() => Boolean, { nullable: false })
  published: boolean;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => Int, { nullable: false })
  id: number;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => Boolean, { nullable: true })
  published?: boolean;
}

export enum CategoryColumnEnum {
  'id' = 'id',
  'name' = 'name',
  'description' = 'description',
  'published' = 'published',
}

// noinspection JSUnusedGlobalSymbols
export enum CategoryOrderEnum {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

export enum CategoryOperationEnum {
  'equals' = '=',
  'like' = 'like',
  'ilike' = 'ilike',
}

registerEnumType(CategoryColumnEnum, { name: 'CategoryColumnEnum' });
registerEnumType(CategoryOrderEnum, { name: 'CategoryOrderEnum' });
registerEnumType(CategoryOperationEnum, { name: 'CategoryOperationEnum' });

@InputType()
export class CategoriesFilter {
  @Field(() => CategoryColumnEnum, { nullable: false })
  column: CategoryColumnEnum;
  @Field(() => CategoryOperationEnum, { nullable: false })
  operation: CategoryOperationEnum;
  @Field(() => String, { nullable: false })
  expression: string;
}

@InputType()
export class CategoriesOrderBy {
  @Field(() => CategoryOrderEnum, { nullable: false })
  order: CategoryOrderEnum;
  @Field(() => CategoryColumnEnum, { nullable: false })
  column: CategoryColumnEnum;
}

@InputType()
export class CategoriesInput {
  @Field(() => Int, { nullable: true })
  limit?: number;
  @Field(() => Int, { nullable: true })
  offset?: number;
  @Field(() => [CategoriesOrderBy], { nullable: true })
  orderBy?: CategoriesOrderBy[];
  @Field(() => [CategoriesFilter], { nullable: true })
  filters?: CategoriesFilter[];
}
