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

    public async AllCategory(
        page: number, limit: number
    ) {
        try {
            let pageSizes = [];
            const itemCount = await this.catemodel.countDocuments();
            let count_page = (itemCount / limit).toFixed()
            const data = await this.catemodel.find()
                .skip((page - 1) * limit)
                .limit(limit);

            if (!Number.isNaN(count_page)) {
                count_page = "0";
            }
            range(1, Number(count_page == "0" ? 1 : count_page)).subscribe(res => {
                pageSizes.push(res)
            });
            let panigator =
            {
                "total": itemCount,
                "totalpage": limit,
                "page": page,
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
