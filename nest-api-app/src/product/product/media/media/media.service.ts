import { Media } from '../../../../modelSchema/MediaModelSchema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.model';

@Injectable()
export class MediaService {



    constructor(@InjectModel('Media')
    private mediamodel: Model<Media>) {
    }

    async InsertMedia(body: any) {
        return await this.mediamodel.insertMany(body);
    }



}


