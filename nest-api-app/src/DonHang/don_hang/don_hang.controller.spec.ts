import { Test, TestingModule } from '@nestjs/testing';
import { DonHangController } from './don_hang.controller';

describe('DonHangController', () => {
  let controller: DonHangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonHangController],
    }).compile();

    controller = module.get<DonHangController>(DonHangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
