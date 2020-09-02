import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput, User, Users, UsersInput } from './users.typeDefs';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/auth.guards';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminGuard)
  @Query(() => User, { nullable: true })
  async user(@Args({ name: 'id', type: () => Int }) id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  @UseGuards(AdminGuard)
  @Query(() => Users, { nullable: true })
  async users(
    @Args({ name: 'input', type: () => UsersInput, nullable: true })
    input: UsersInput,
  ): Promise<Users> {
    return this.usersService.getUsers(input);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => User)
  async createUser(
    @Args({ name: 'input', type: () => CreateUserInput })
    input: CreateUserInput,
  ): Promise<User> {
    return this.usersService.createUser(input);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => User)
  async updateUser(
    @Args({ name: 'input', type: () => UpdateUserInput })
    input: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(input);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => User)
  async deleteUser(@Args({ name: 'id', type: () => Int }) id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
