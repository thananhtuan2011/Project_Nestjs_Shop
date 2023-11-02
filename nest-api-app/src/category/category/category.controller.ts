import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/dto/category';

@Controller('loai')
export class CategoryController {

    constructor(private _cate_service: CategoryService,
    ) {

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
