import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/model/ProductModelSchema';
import { OrderSchema } from 'src/model/OrderModelSchema';
import { OrderService } from './product/order/order.service';
import { MediaSchema } from 'src/model/MediaModelSchema';
import { MediaService } from './product/media/media/media.service';

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
      },

      {
        name: 'Media',
        schema: MediaSchema
      }
    ]

  ),
  ],
  controllers: [ProductController],
  providers: [ProductService, OrderService, MediaService]
})
export class ProductModule { }