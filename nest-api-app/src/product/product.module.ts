import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/modelSchema/ProductModelSchema';
import { MediaSchema } from 'src/modelSchema/MediaModelSchema';
import { MediaService } from './product/media/media/media.service';
import { MinioClientModule } from 'src/Minio/nest-minio-client/nest-minio-client.module';

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
    MinioClientModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, MediaService]
})
export class ProductModule { }
