import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.model';
import { Product } from 'src/model/ProductModelSchema';

@Injectable()
export class ProductService extends BaseRepository<Product> {


    constructor(@InjectModel('Product')
    private loginmodel: Model<Product>) {
        super(loginmodel)
    }
}
