import { Test, TestingModule } from '@nestjs/testing';
import { RegisterLoginService } from './register_login.service';

describe('RegisterLoginService', () => {
  let service: RegisterLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterLoginService],
    }).compile();

    service = module.get<RegisterLoginService>(RegisterLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
