import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.model';
import { LoginModel } from 'src/dto/login.dto';
import { OrderModel } from 'src/dto/order.dto';
import { Order } from 'src/modelSchema/OrderModelSchema';

@Injectable()
export class OrderService extends BaseRepository<Order> {

    constructor(@InjectModel('Order')
    private ordermodel: Model<Order>) {
        super(ordermodel)
    }

    CreaedOrder(body: OrderModel) {
        try {
            this.ordermodel.create(body)
            return { status: 1 }
        }
        catch (e) {
            return { status: 0, message: e.message || 'my error' }
        }
    }

    OrderDetail(order_id: string) {
        const order = this.ordermodel.findById(order_id);
        if (order) {
            order.populate({ path: "User", select: "username " })
            order.populate({ path: "Product", select: "DonGiaGoc" })

            return order;
        }
        else {
            throw new NotFoundException(order_id)
        }
    }

    async GetCartByAcount() {

    }
    async DeleteProductInOrder(objectId: string, _id: string) {
        const order = await this.ordermodel.updateMany({ _id: objectId }, { $pull: { Product: { $in: [_id] } } });

        return await this.ordermodel.findById(objectId)
    }

    async UpdateProductInOrder(objectId: string, _id: string) {
        const order = await this.ordermodel.updateMany({ _id: objectId }, { $push: { Product: { _id } } });
        return await this.ordermodel.findById(objectId)
    }


}
