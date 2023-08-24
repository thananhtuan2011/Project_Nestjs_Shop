import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth/auth.module';
import { UserModule } from './user/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ShareModule } from './share/share.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot(),
    UserModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ShareModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
