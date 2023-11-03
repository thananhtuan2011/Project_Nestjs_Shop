import { Body, Controller, HttpStatus, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/dto/category';
import { PageOptionsDto } from 'src/share/Pagination/PageOption';

@Controller('loai')
export class CategoryController {

    constructor(private _cate_service: CategoryService,
    ) {

    }
    @Post("AllCategory")
    async AllCategory(@Query() pageOptionsDto: PageOptionsDto,) {
        return await this._cate_service.AllCategory(pageOptionsDto.page, pageOptionsDto.take)
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
