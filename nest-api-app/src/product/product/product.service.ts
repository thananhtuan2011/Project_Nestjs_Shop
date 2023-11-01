import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.model';
import { Product } from 'src/modelSchema/ProductModelSchema';

@Injectable()
export class ProductService extends BaseRepository<Product> {


    constructor(@InjectModel('Product')
    private loginmodel: Model<Product>) {
        super(loginmodel)
    }

    async UpdateProduct(objectId: string, media_id: number) {
        return await this.loginmodel.updateOne({ _id: objectId, "Media._id": Number.parseInt(media_id.toString()) }, { $set: { "Media.$.url": "cccccccccccc" } });

    }
}
