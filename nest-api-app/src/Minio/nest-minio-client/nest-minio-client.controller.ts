import { Controller, Inject, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload/file-upload.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { BufferedFile } from '../file.model';
@Controller('file')
export class NestMinioClientController {
    constructor(
        private fileUploadService: FileUploadService
    ) { }
    @Post('single')
    @UseInterceptors(FileInterceptor('image'))
    async uploadSingle(
        @UploadedFile() image: BufferedFile
    ) {
        console.log("image", image)
        return await this.fileUploadService.uploadSingle(image)
    }
    @Post('many')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
    ]))
    async uploadMany(
        @UploadedFiles() files: BufferedFile,
    ) {
        return this.fileUploadService.uploadMany(files)
    }
}
