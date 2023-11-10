import { Test, TestingModule } from '@nestjs/testing';
import { NestMinioClientController } from './nest-minio-client.controller';

describe('NestMinioClientController', () => {
  let controller: NestMinioClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NestMinioClientController],
    }).compile();

    controller = module.get<NestMinioClientController>(NestMinioClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
