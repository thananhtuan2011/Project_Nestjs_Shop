import { Test, TestingModule } from '@nestjs/testing';
import { CategorySubService } from './category_sub.service';

describe('CategorySubService', () => {
  let service: CategorySubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategorySubService],
    }).compile();

    service = module.get<CategorySubService>(CategorySubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
