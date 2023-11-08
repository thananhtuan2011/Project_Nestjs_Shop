import { LoginService } from './../../user/user/login/services/login/login.service';
import { JwtStrategy } from './../../user/user/jwt.strategy';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/modelSchema/OrderModelSchema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductSchema } from 'src/modelSchema/ProductModelSchema';
import { UserSchema } from 'src/modelSchema/UserModelSchema';
import { OrderModel } from 'src/dto/order.dto';

@Module({
  imports: [MongooseModule.forFeature(
    [

      {
        name: 'Order',
        schema: OrderSchema
      },

    ]
  ),

  ],
  controllers: [OrderController],
  providers: [OrderService, JwtService],
  exports: [OrderService]
})
export class OrderModule { }
