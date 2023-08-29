import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductModel } from 'src/dto/product.dto';
import { OrderModel } from 'src/dto/order.dto';
import { OrderService } from './order/order.service';

@Controller('product')
export class ProductController {


    constructor(private _product_service: ProductService, private _order_service: OrderService) {

    }
    @Post("insert")
    async CreateProduct(@Body() body: ProductModel) {
        return await this._product_service.create(body)
    }
    @Post("OrderProduct")
    async OrderProduct(@Body() body: OrderModel) {
        return await this._order_service.CreaedOrder(body)
    }

    @Post("GetOrder/:id")
    async GetOrder(@Param("id") id: string) {
        return await this._order_service.OrderDetail(id)
    }


    @Post("DeleteProductInOrder/:id/:id_pro")
    async DeleteProductInOrder(@Param("id") id: string, @Param("id_pro") id_pro: string) {
        return await this._order_service.DeleteProductInOrder(id, id_pro)
    }

    @Post("UpdateProductInOrder/:id/:id_pro")
    async UpdateProductInOrder(@Param("id") id: string, @Param("id_pro") id_pro: string) {
        return await this._order_service.UpdateProductInOrder(id, id_pro)
    }
}


