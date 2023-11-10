import { Body, Controller, NotFoundException, Param, Post, Query, Req, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductModel } from 'src/dto/product.dto';
import { OrderModel } from 'src/dto/order.dto';
import { MediaService } from './media/media/media.service';
import { PageOptionsDto } from 'src/share/Pagination/PageOption';


@Controller('product')
export class ProductController {


    constructor(private _product_service: ProductService,
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

    @Get("GetDSSPHome")
    async GetDSSPHome() {
        return await this._product_service.GetDSSPHome();
    }
    @Post("AllProduct")
    async AllProduct(@Query() pageOptionsDto: PageOptionsDto,) {
        return await this._product_service.AllProduct(pageOptionsDto.page, pageOptionsDto.take)
    }

    @Post("AllProductType/:id")
    async AllProductType(@Query() pageOptionsDto: PageOptionsDto, @Param("id") id: string) {
        return await this._product_service.AllProductType(pageOptionsDto.page, pageOptionsDto.take, id)
    }
    @Get("GetProductDetail/:id")
    async GetProductDetail(@Param("id") id: string) {
        return await this._product_service.GetProductDetail(id)
    }


    @Get("GetDSSlideMini")
    async GetDSSlideMini() {
        return await this._product_service.GetDSSlideMini()
    }
    @Get("GetDSBest")
    async GetDSBest() {
        return await this._product_service.GetDSBest()
    }

    @Post("UpdateLuotMua/:id/:amount")
    async UpdateLuotMua(@Param("id") id: string,
        @Param("amount") amount: number) {
        await this._product_service.UpdateLuotMua(id, amount)
        return await this._product_service.findById(id)
    }
    @Post("UpdateProduct/:id/:media_id")
    async UpdateProduct(@Param("id") id: string,
        @Param("media_id") media_id: number) {
        await this._product_service.UpdateProduct(id, media_id)
        return await this._product_service.findById(id)
    }
}


