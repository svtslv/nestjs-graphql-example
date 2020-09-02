import { Module } from '@nestjs/common';
import { GraphQlModule } from './graphql/graphql.module';
import { ConfigModule } from './config/config.module';
import { ObjectionModule } from './objection/objection.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    GraphQlModule,
    ConfigModule,
    ObjectionModule,
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    FilesModule,
  ],
})
export class AppModule {}
