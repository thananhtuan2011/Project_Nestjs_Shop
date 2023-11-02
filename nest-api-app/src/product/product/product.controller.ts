import { Body, Controller, NotFoundException, Param, Post, Query, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductModel } from 'src/dto/product.dto';
import { OrderModel } from 'src/dto/order.dto';
import { OrderService } from './order/order.service';
import { MediaService } from './media/media/media.service';
import { PageOptionsDto } from 'src/share/Pagination/PageOption';


@Controller('product')
export class ProductController {


    constructor(private _product_service: ProductService, private _order_service: OrderService,
        private _media_service: MediaService
    ) {

    }
    @Post("insert")
    async CreateProduct(@Body() body: ProductModel) {
        const data = await this._product_service.create(body)
        if (data) {
            return data;
        }
        else {
            throw new NotFoundException(data)
        }

    }
    @Post("AllProduct")
    async AllProduct(@Query() pageOptionsDto: PageOptionsDto,) {
        console.log("gggg", pageOptionsDto)
        return await this._product_service.GetAllProduct(pageOptionsDto)
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

    @Post("UpdateProduct/:id/:media_id")
    async UpdateProduct(@Param("id") id: string,
        @Param("media_id") media_id: number) {
        await this._product_service.UpdateProduct(id, media_id)
        return await this._product_service.findById(id)
    }
}


