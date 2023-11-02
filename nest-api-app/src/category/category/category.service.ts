import { Category } from './../../modelSchema/CategoryModelSchema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.model';
import { PageOptionsDto } from 'src/share/Pagination/PageOption';
import { PageMetaDto } from 'src/share/Pagination/page-meta.dto';
import { PageDto } from 'src/share/Pagination/page.dto';

@Injectable()
export class CategoryService extends BaseRepository<Category> {

    constructor(@InjectModel('Category')
    private catemodel: Model<Category>) {
        super(catemodel)
    }

    async AddCatrgory() {
        return await this.catemodel.create();

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
