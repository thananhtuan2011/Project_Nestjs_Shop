import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.model';
import { ProductModel } from 'src/dto/product.dto';
import { Product } from 'src/modelSchema/ProductModelSchema';



@Injectable()
export class ProductService extends BaseRepository<Product> {


    constructor(@InjectModel('Product')
    private promodel: Model<Product>) {
        super(promodel)
    }

    async UpdateProduct(objectId: string, media_id: number) {
        return await this.promodel.updateOne({ _id: objectId, "Media._id": Number.parseInt(media_id.toString()) }, { $set: { "Media.$.url": "cccccccccccc" } });

    }

    public async GetAllProduct(
        page: number, limit: number
    ) {
        const itemCount = await this.promodel.countDocuments();
        const count_page = (itemCount / limit).toFixed()
        const dt = await this.promodel.find()
            .skip((page - 1) * limit)
            .limit(limit);



        return { count_page, dt }

    }
}
