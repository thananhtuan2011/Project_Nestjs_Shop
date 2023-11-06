import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginService } from './login/services/login/login.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,
    });
  }
  // async validate({ username }) {
  //   const user = await this.login_services.validateUser(username);

  //   if (!user) {
  //     throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  //   }

  //   return user;
  // }
  async validate(payload: any) {
    return { payload };

  }
}
