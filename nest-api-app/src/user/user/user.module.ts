import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/services/login/login.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/model/UserModel';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [LoginController],
  imports: [MongooseModule.forFeature(
    [
      {
        name: 'User',
        schema: UserSchema
      }
    ]

  ),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('SECRETKEY'),
      signOptions: {
        expiresIn: configService.get('EXPIRESIN'),
      },
    }),
    inject: [ConfigService],
  }),
  ],
  providers: [LoginService, JwtStrategy]

})
export class UserModule {

  constructor() {

  }

}