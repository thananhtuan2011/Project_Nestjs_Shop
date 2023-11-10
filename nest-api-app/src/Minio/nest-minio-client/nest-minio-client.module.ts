import { config } from './../config';
import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { MinioClientService } from './minio-client/minio-client.service';
import { FileUploadService } from './file-upload/file-upload.service';
import { NestMinioClientController } from './nest-minio-client.controller';
@Module({
    imports: [
        MinioModule.register({
            endPoint: config.MINIO_ENDPOINT,
            port: config.MINIO_PORT,
            useSSL: false,
            accessKey: config.MINIO_ACCESSKEY,
            secretKey: config.MINIO_SECRETKEY,
        })
    ],
    controllers: [NestMinioClientController],
    providers: [MinioClientService, FileUploadService],
    exports: [MinioClientService]
})
export class MinioClientModule { }