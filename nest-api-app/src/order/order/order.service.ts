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
    public ordermodel: Model<Order>) {
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

    async UpdateSpOrder(body) {
        return await this.ordermodel.findByIdAndUpdate(body._id, { $set: { soluong: body.sl, color: body.color.trim(), Size: body.size.trim() } })
    }
    async RemoveSpOrder(id,) {
        return await this.ordermodel.deleteOne({ _id: id });
    }


    OrderDetail(order_id: string) {
        const order = this.ordermodel.findById(order_id);
        if (order) {
            order.populate({ path: "User", select: "username createdAt" })
            order.populate({ path: "Product", select: "DonGiaGoc product_name Img Mota " })
            order.populate({ path: "Category", select: "category_code category_name" })
            return order;
        }
        else {
            throw new NotFoundException(order_id)
        }
    }
    async GetCart(objectId_user: string) {
        try {

            const order = await this.ordermodel.find({ User: objectId_user, Pay: false })
                .populate({ path: "User", select: "username createdAt" })
                .populate({ path: "Product", select: "DonGiaGoc product_name Img Mota " })
                .populate({ path: "Category", select: "category_code category_name" })
            return order;
        }
        catch {
            throw new NotFoundException(objectId_user)
        }
    }
    async UpdatePay(id) {
        return await this.ordermodel.findByIdAndUpdate(id, { $set: { Pay: true } })
    }

    async GetCartByAcount(objectId_user) {

        return await this.ordermodel.find({ User: objectId_user, Pay: false }).count();
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
