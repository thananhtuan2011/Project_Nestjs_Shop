import { Body, Controller, NotFoundException, Param, Post, Query, Req, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductModel } from 'src/dto/product.dto';
import { OrderModel } from 'src/dto/order.dto';
import { MediaService } from './media/media/media.service';
import { PageOptionsDto } from 'src/share/Pagination/PageOption';
import { MinioClientService } from 'src/Minio/nest-minio-client/minio-client/minio-client.service';
import { config } from 'src/Minio/config';
import { BufferedFile } from 'src/Minio/file.model';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express'

@Controller('product')
export class ProductController {
    private readonly baseBucket = config.MINIO_BUCKET

    constructor(private _product_service: ProductService,
        private _file_service: MinioClientService
    ) {

    }
    @Post("AddProduct")
    @UseInterceptors(FileInterceptor('image'))
    async CreateProduct(@Body() body: any, @UploadedFile() image: BufferedFile) {
        var databody = JSON.parse(body["data"]);
        console.log("vnevdv", databody)
        var ulrfile;
        if (image) {
            console.log("Có file");
            ulrfile = await this._file_service.upload(image, this.baseBucket)

            databody["Img"] = {};
            databody["Img"] = "http://" + ulrfile.url.toString();

        }

        const data = await this._product_service.create(databody)
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
    @Post("RemoveSp/:id")
    async RemoveSp(@Param("id") id: string) {
        return await this._product_service.RemoveSp(id)
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


