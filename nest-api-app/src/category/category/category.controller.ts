import { QueryParamsModel } from './../../share/Pagination/Querypram';
import { Body, Controller, HttpStatus, Param, Post, Query, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/dto/category';

@Controller('loai')
export class CategoryController {

    constructor(private _cate_service: CategoryService,
    ) {

    }
    @Get("GetDSLoai")
    async GetDSLoai() {
        var data = await this._cate_service.GetDSLoai()
        return { status: 1, data }
    }
    @Post("AllCategory")
    async AllCategory(@Body() pageOptionsDto: QueryParamsModel) {
        return await this._cate_service.AllCategory(pageOptionsDto)
    }
    @Post("UpdateCategory")
    async UpdateCategory(@Body() cate: CategoryDto) {
        return await this._cate_service.Updatecategory(cate.category_id, cate.category_code, cate.category_name)
    }

    @Post("AddCateGory")
    async AddCateGory(@Body() cate: CategoryDto) {
        try {
            await this._cate_service.create(cate)

            return { status: 1 }
        }
        catch (e) {
            return { status: HttpStatus.NOT_FOUND, message: e.message || 'my error' }
        }
    }
}
