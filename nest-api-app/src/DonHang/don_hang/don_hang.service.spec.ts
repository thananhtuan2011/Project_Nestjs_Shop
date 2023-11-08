import { Test, TestingModule } from '@nestjs/testing';
import { DonHangService } from './don_hang.service';

describe('DonHangService', () => {
  let service: DonHangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonHangService],
    }).compile();

    service = module.get<DonHangService>(DonHangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
