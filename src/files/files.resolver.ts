import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/auth.guards';
import { CreateFileInput, File } from './files.typeDefs';

@Resolver(() => File)
export class FileResolver {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(AdminGuard)
  @Mutation(() => File)
  async createFile(
    @Args({ name: 'input', type: () => CreateFileInput })
    input: CreateFileInput,
  ): Promise<File> {
    return this.filesService.createFile(input);
  }
}
