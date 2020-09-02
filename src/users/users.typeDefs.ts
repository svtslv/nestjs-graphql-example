import { Field, Int, ObjectType, InputType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { nullable: false })
  id: number;
  @Field(() => String, { nullable: false })
  firstName: string;
  @Field(() => String, { nullable: false })
  lastName: string;
  @Field(() => String, { nullable: false })
  email: string;
  @Field(() => Boolean, { nullable: false })
  isAdmin: boolean;
}

@ObjectType()
export class Users {
  @Field(() => [User], { nullable: true })
  nodes?: User[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  firstName: string;
  @Field(() => String, { nullable: false })
  lastName: string;
  @Field(() => String, { nullable: false })
  email: string;
  @Field(() => String, { nullable: false })
  password: string;
  @Field(() => Boolean, { nullable: false })
  isAdmin: boolean;
}

@InputType()
export class UpdateUserInput {
  @Field(() => Int, { nullable: false })
  id: number;
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  password?: string;
  @Field(() => Boolean, { nullable: true })
  isAdmin?: boolean;
}

export enum UserColumnEnum {
  'id' = 'id',
  'firstName' = 'firstName',
  'lastName' = 'lastName',
  'email' = 'email',
  'isAdmin' = 'isAdmin',
}

// noinspection JSUnusedGlobalSymbols
export enum UserOrderEnum {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

export enum UserOperationEnum {
  'equals' = '=',
  'like' = 'like',
  'ilike' = 'ilike',
}

registerEnumType(UserColumnEnum, { name: 'UserColumnEnum' });
registerEnumType(UserOrderEnum, { name: 'UserOrderEnum' });
registerEnumType(UserOperationEnum, { name: 'UserOperationEnum' });

@InputType()
export class UsersFilter {
  @Field(() => UserColumnEnum, { nullable: false })
  column: UserColumnEnum;
  @Field(() => UserOperationEnum, { nullable: false })
  operation: UserOperationEnum;
  @Field(() => String, { nullable: false })
  expression: string;
}

@InputType()
export class UsersOrderBy {
  @Field(() => UserOrderEnum, { nullable: false })
  order: UserOrderEnum;
  @Field(() => UserColumnEnum, { nullable: false })
  column: UserColumnEnum;
}

@InputType()
export class UsersInput {
  @Field(() => Int, { nullable: true })
  limit?: number;
  @Field(() => Int, { nullable: true })
  offset?: number;
  @Field(() => [UsersOrderBy], { nullable: true })
  orderBy?: UsersOrderBy[];
  @Field(() => [UsersFilter], { nullable: true })
  filters?: UsersFilter[];
}
