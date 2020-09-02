import * as bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { OmUser } from '../objection/om.user';
import { OmAuth } from '../objection/om.auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(OmUser) private readonly userModel: typeof OmUser,
    @InjectModel(OmAuth) private readonly authModel: typeof OmAuth,
  ) {}

  async modifyRequest(request: Request & { auth: any }) {
    const requestAuth = {
      accessToken: null,
      user: null,
    };

    if (request.headers.authorization) {
      const jwtToken = request.headers.authorization.split(' ').pop();

      let jwtObject = null;

      try {
        jwtObject = this.jwtService.verify(jwtToken);
      } catch {
        // JWTVerifyError
      }

      if (jwtObject && jwtObject.userId) {
        const auth = await this.authModel
          .query()
          .where({ accessToken: jwtObject.accessToken })
          .first();

        if (auth) {
          const user = await this.userModel.query().findById(auth.userId);

          if (user) {
            requestAuth.user = user;
            requestAuth.accessToken = auth.accessToken;
          }
        }
      }
    }

    request.auth = requestAuth;
    return request;
  }

  async getAuth(auth) {
    return {
      user: auth.user,
    };
  }

  async createAuth(input) {
    let jwtToken = null;
    const { email, password } = input;

    const user = await this.userModel
      .query()
      .where<OmUser>({ email })
      .first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const accessToken = uuidV4();
      await this.authModel.query().insert({
        userId: user.id,
        accessToken,
      });
      jwtToken = this.jwtService.signAsync({
        userId: user.id,
        accessToken,
      });
    }

    if (!jwtToken) {
      throw Error('Unauthorized');
    }

    return {
      jwtToken,
      user,
    };
  }

  async deleteAuth(auth) {
    return this.authModel
      .query()
      .where<OmAuth>({ accessToken: auth.accessToken })
      .delete()
      .returning('*')
      .first();
  }
}
