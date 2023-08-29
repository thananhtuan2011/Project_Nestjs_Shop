import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/model/ProductModelSchema';
import { OrderSchema } from 'src/model/OrderModelSchema';
import { OrderService } from './product/order/order.service';

@Module({
  imports: [MongooseModule.forFeature(
    [
      {
        name: 'Product',
        schema: ProductSchema
      },
      {
        name: 'Order',
        schema: OrderSchema
      }
    ]

  ),
  ],
  controllers: [ProductController],
  providers: [ProductService, OrderService]
})
export class ProductModule { }
