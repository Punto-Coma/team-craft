import { genSalt, hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

import { ITokenPayload } from '../interfaces/token-payload.interface';
import { envs } from '../config/envs';

export class Password {
  private static async GetSalt(): Promise<string> {
    return await genSalt();
  }

  static async GetHashedPassword(password: string): Promise<string> {
    return await hash(password, await this.GetSalt());
  }

  static async ValidatePassword(enteredPassword: string, savedPassword: string) {
    return await compare(enteredPassword, savedPassword);
  }

  static GetToken(data: { [key: string]: unknown }) {
    return sign(
      {
        ...data,
      },
      envs.APP_SECRET,
      {
        expiresIn: envs.EXPIRES,
      }
    );
  }

  static VerifyToken(token: string): ITokenPayload | false {
    try {
      if (token.startsWith('Bearer ')) token = token.split(' ')[1];

      if (token !== '') {
        const payload = verify(token, envs.APP_SECRET);

        return payload as ITokenPayload;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
