import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput, UpdateCategoryInput, Category, Categories, CategoriesInput } from './categories.typeDefs';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/auth.guards';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly countriesService: CategoriesService) {}

  @Query(() => Category, { nullable: true })
  async category(@Args({ name: 'id', type: () => Int }) id: number): Promise<Category> {
    return this.countriesService.getCategory(id);
  }

  @Query(() => Categories, { nullable: true })
  async categories(
    @Args({ name: 'input', type: () => CategoriesInput, nullable: true })
    input: CategoriesInput,
  ): Promise<Categories> {
    return this.countriesService.getCategories(input);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Category)
  async createCategory(
    @Args({ name: 'input', type: () => CreateCategoryInput })
    input: CreateCategoryInput,
  ): Promise<Category> {
    return this.countriesService.createCategory(input);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Category)
  async updateCategory(
    @Args({ name: 'input', type: () => UpdateCategoryInput })
    input: UpdateCategoryInput,
  ): Promise<Category> {
    return this.countriesService.updateCategory(input);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Category)
  async deleteCategory(@Args({ name: 'id', type: () => Int }) id: number): Promise<Category> {
    return this.countriesService.deleteCategory(id);
  }
}
