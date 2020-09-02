import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field(() => String, { nullable: false })
  url: string;
  @Field(() => String, { nullable: false })
  putUrl: string;
}

@InputType()
export class CreateFileInput {
  @Field(() => String, { nullable: false })
  name: string;
}
