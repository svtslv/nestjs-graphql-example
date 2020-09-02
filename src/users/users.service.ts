import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { OmUser } from '../objection/om.user';
import { CreateUserInput, UpdateUserInput, UsersInput } from './users.typeDefs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(OmUser) private readonly userModel: typeof OmUser) {}

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10)
  }

  async getUser(id: number) {
    return this.userModel
      .query()
      .where({ id })
      .first();
  }

  async getUsers(input: UsersInput) {
    return this.userModel.getMany<OmUser>(input);
  }

  async createUser(input: CreateUserInput) {
    input.password = this.hashPassword(input.password);
    return this.userModel
      .query()
      .insert(input)
      .returning('*')
      .first();
  }

  async updateUser(input: UpdateUserInput) {
    if(input.password) {
      input.password = this.hashPassword(input.password);
    }

    const { id, ...user } = input;

    return this.userModel
      .query()
      .patch(user)
      .where({ id })
      .returning('*')
      .first();
  }

  async deleteUser(id) {
    return this.userModel
      .query()
      .deleteById(id)
      .returning('*')
      .first();
  }
}
