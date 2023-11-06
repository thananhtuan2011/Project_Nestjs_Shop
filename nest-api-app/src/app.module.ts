import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth/auth.module';
import { UserModule } from './user/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ShareModule } from './share/share.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { KafkaModule } from './kafka/kafka/kafka.module';
import { KafkaConsumer } from './kafka/kafka.consumer';
import { CategoryModule } from './category/category/category.module';
import { OrderModule } from './order/order/order.module';

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot(),
    UserModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ShareModule,
    ProductModule,
    OrderModule,
    CategoryModule,
    // KafkaModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
