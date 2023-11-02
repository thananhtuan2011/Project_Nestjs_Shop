import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.model';
import { ProductModel } from 'src/dto/product.dto';
import { Product } from 'src/modelSchema/ProductModelSchema';
import { PageOptionsDto } from 'src/share/Pagination/PageOption';
import { PageMetaDto } from 'src/share/Pagination/page-meta.dto';
import { PageDto } from 'src/share/Pagination/page.dto';


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
        pageOptionsDto: PageOptionsDto,
    ) {
        console.log("pageOptionsDto", pageOptionsDto)
        var dt = await this.promodel.find()
            .skip(pageOptionsDto.skip)
            .limit(pageOptionsDto.take);


        const itemCount = await this.promodel.find().countDocuments();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(dt, pageMetaDto);
    }
}
