import { Module } from '@nestjs/common';
import { GraphQLModule as NestJSGraphQLModule } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    NestJSGraphQLModule.forRootAsync({
      imports: [AuthModule],
      inject: [AuthService],
      useFactory(authService: AuthService) {
        // noinspection JSUnusedGlobalSymbols
        return {
          debug: true,
          playground: true,
          autoSchemaFile: true,
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          context: async ({ req }) => ({
            req: await authService.modifyRequest(req),
          }),
          // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        };
      },
    }),
  ],
})
export class GraphQlModule {}
