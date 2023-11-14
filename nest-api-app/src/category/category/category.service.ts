import { Category } from './../../modelSchema/CategoryModelSchema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { range } from 'rxjs';
import { BaseRepository } from 'src/base.model';


@Injectable()
export class CategoryService extends BaseRepository<Category> {

    constructor(@InjectModel('Category')
    private catemodel: Model<Category>) {
        super(catemodel)
    }

    async AddCatrgory() {
        return await this.catemodel.create();

    }
    async Updatecategory(objectid, category_code, category_name) {
        return await this.catemodel.updateOne({ _id: objectid }, { $set: { category_code: category_code, category_name: category_name } });
    }
    public async AllCategory(
        pram: any
    ) {
        try {
            let pageSizes = [];
            const itemCount = await this.catemodel.countDocuments();
            let count_page = (itemCount / pram.paginator.pageSize).toFixed()
            const data = await this.catemodel.find()
                .skip((pram.paginator.page - 1) * pram.paginator.pageSize)
                .limit(pram.paginator.pageSize);

            if (!Number.isNaN(count_page)) {
                count_page = "0";
            }
            range(1, Number(count_page == "0" ? 1 : count_page)).subscribe(res => {
                pageSizes.push(res)
            });
            let panigator =
            {
                "total": itemCount,
                "totalpage": pram.paginator.pageSize,
                "page": pram.paginator.page,
                "pageSize": count_page,
                "pageSizes": pageSizes
            }
            // console.log("ffff", panigator)
            return { status: 1, panigator, data }
        }
        catch (e) {
            return { status: 0, message: e.message || 'my error' }
        }
    }
    async GetDSLoai() {
        const cate = this.catemodel.find()

        if (cate) {
            cate.populate({ path: "CategorySub", select: "_id category_name" })

            return cate;
        }
    }
    // public async getUsers(
    //     pageOptionsDto: PageOptionsDto,
    //   ): Promise<PageDto<UserDto>> {
    //     const queryBuilder = this._userRepository.createQueryBuilder("user");

    //     queryBuilder
    //       .skip(pageOptionsDto.skip)
    //       .take(pageOptionsDto.take);

    //     const itemCount = await queryBuilder.getCount();
    //     const { entities } = await queryBuilder.getRawAndEntities();

    //     const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    //     return new PageDto(entities, pageMetaDto);
    //   }

}
