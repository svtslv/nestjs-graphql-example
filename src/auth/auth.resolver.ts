import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAuthInput, Auth } from './auth.typeDefs';
import { ReqAuth } from './auth.decorators';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from './auth.guards';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Auth, { nullable: true })
  async auth(@ReqAuth() auth: Auth): Promise<Auth> {
    return this.authService.getAuth(auth);
  }

  @Mutation(() => Auth)
  async createAuth(
    @Args({ name: 'input', type: () => CreateAuthInput })
    input: CreateAuthInput,
  ): Promise<Auth> {
    return this.authService.createAuth(input);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Auth)
  async deleteAuth(@ReqAuth() auth: Auth): Promise<Auth> {
    return this.authService.deleteAuth(auth);
  }
}
