import { Resolver, Query, Args, Int, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { CreateProductInput, UpdateProductInput, Product, Products, ProductsInput } from './products.typeDefs';
import { ProductsService } from './products.service';
import { CategoriesService } from '../categories/categories.service';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/auth.guards';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Query(() => Product, { nullable: true })
  async product(@Args({ name: 'id', type: () => Int }) id: number): Promise<Product> {
    return this.productsService.getProduct(id);
  }

  @Query(() => Products, { nullable: true })
  async products(
    @Args({ name: 'input', type: () => ProductsInput, nullable: true })
    input: ProductsInput,
  ): Promise<Products> {
    return this.productsService.getProducts(input);
  }

  @ResolveField()
  async category(@Parent() product: Product) {
    return this.categoriesService.getCategory(product.categoryId);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Product)
  async createProduct(
    @Args({ name: 'input', type: () => CreateProductInput })
    input: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.createProduct(input);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Product)
  async updateProduct(
    @Args({ name: 'input', type: () => UpdateProductInput })
    input: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.updateProduct(input);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Product)
  async deleteProduct(@Args({ name: 'id', type: () => Int }) id: number): Promise<Product> {
    return this.productsService.deleteProduct(id);
  }
}
