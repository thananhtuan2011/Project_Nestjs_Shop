import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { range } from 'rxjs';
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
    async UpdateLuotMua(objectId: string, amount: number, slmua: number) {
        let amountup = amount - slmua;

        return await this.promodel.updateOne({ _id: objectId }, { $set: { amount: amountup } });

    }
    async RemoveSp(objectId: string) {
        try {
            await this.promodel.deleteOne({ _id: objectId });

            return { status: 1 }
        }
        catch (ex) {
            return { status: 0, error: ex }
        }

    }


    async GetDSSPHome() {
        var data = await this.promodel.find().limit(8);
        return { status: 1, data }
    }
    async GetDSBest() {
        var data = await this.promodel.aggregate([{ $sample: { size: 4 } }])
        return { status: 1, data }
    }
    async GetDSSlideMini() {
        var data = await this.promodel.aggregate([{ $sample: { size: 4 } }])
        return { status: 1, data }
    }



    async GetProductDetail(id) {
        var data = await this.promodel.findById(id);
        return { status: 1, data }
    }
    public async AllProduct2(
        pram: any
    ) {
        try {
            let pageSizes = [];
            const itemCount = await this.promodel.countDocuments();
            let count_page = (itemCount / pram.paginator.pageSize).toFixed()
            const data = await this.promodel.find()
                .skip((pram.paginator.page - 1) * pram.paginator.pageSize)
                .limit(pram.paginator.pageSize);

            if (!Number.isNaN(count_page)) {
                count_page = "0";
            }
            range(1, Number(count_page == "0" ? 1 : count_page)).subscribe(res => {
                pageSizes.push(res)
            });
            let panigator =
            {
                "total": itemCount,
                "totalpage": pram.paginator.pageSize,
                "page": pram.paginator.page,
                "pageSize": count_page,
                "pageSizes": pageSizes
            }
            // console.log("ffff", panigator)
            return { status: 1, panigator, data }
        }
        catch (e) {
            return { status: 0, message: e.message || 'my error' }
        }
    }
    public async AllProduct(
        page: number, limit: number
    ) {
        try {
            let pageSizes = [];
            const itemCount = await this.promodel.countDocuments();
            let count_page = (itemCount / limit).toFixed()
            const data = await this.promodel.find()
                .skip((page - 1) * limit)
                .limit(limit);

            if (!Number.isNaN(count_page)) {
                count_page = "0";
            }
            range(1, Number(count_page == "0" ? 1 : count_page)).subscribe(res => {
                pageSizes.push(res)
            });
            let panigator =
            {
                "total": itemCount,
                "totalpage": limit,
                "page": page,
                "pageSize": count_page,
                "pageSizes": pageSizes
            }
            // console.log("ffff", panigator)
            return { status: 1, panigator, data }
        }
        catch (e) {
            return { status: 0, message: e.message || 'my error' }
        }
    }
    public async AllProductType(
        pram: any, id: string
    ) {
        try {
            let pageSizes = [];
            const itemCount = await this.promodel.countDocuments({ category_id: id });
            let count_page = (itemCount / pram.paginator.pageSize).toFixed()
            const data = await this.promodel.find({ category_id: id })
                .skip((pram.paginator.page - 1) * pram.paginator.pageSize)
                .limit(pram.paginator.pageSize);

            if (!Number.isNaN(count_page)) {
                count_page = "0";
            }

            range(1, Number(count_page == "0" ? 1 : count_page)).subscribe(res => {
                pageSizes.push(res)
            });
            let panigator =
            {
                "total": itemCount,
                "totalpage": pram.paginator.pageSize,
                "page": pram.paginator.page,
                "pageSize": count_page,
                "pageSizes": pageSizes
            }
            // console.log("ffff", panigator)
            return { status: 1, panigator, data }
        }
        catch (e) {
            return { status: 0, message: e.message || 'my error' }
        }
    }
}
