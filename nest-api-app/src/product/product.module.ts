import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/modelSchema/ProductModelSchema';
import { MediaSchema } from 'src/modelSchema/MediaModelSchema';
import { MediaService } from './product/media/media/media.service';

@Module({
  imports: [MongooseModule.forFeature(
    [
      {
        name: 'Product',
        schema: ProductSchema
      },

      {
        name: 'Media',
        schema: MediaSchema
      }
    ]

  ),
  ],
  controllers: [ProductController],
  providers: [ProductService, MediaService]
})
export class ProductModule { }
