import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../users/users.typeDefs';

@ObjectType()
export class Auth {
  @Field(() => String, { nullable: true })
  jwtToken?: string;
  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class CreateAuthInput {
  @Field(() => String, { nullable: false })
  email: string;
  @Field(() => String, { nullable: false })
  password: string;
}
