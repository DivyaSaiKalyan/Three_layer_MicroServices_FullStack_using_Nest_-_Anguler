import { Test, TestingModule } from '@nestjs/testing';
import { RegisterLoginController } from './register_login.controller';

describe('RegisterLoginController', () => {
  let controller: RegisterLoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterLoginController],
    }).compile();

    controller = module.get<RegisterLoginController>(RegisterLoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
