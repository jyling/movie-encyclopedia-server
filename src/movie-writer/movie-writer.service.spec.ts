import { Test, TestingModule } from '@nestjs/testing';
import { MovieWriterService } from './movie-writer.service';

describe('MovieWriterService', () => {
  let service: MovieWriterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieWriterService],
    }).compile();

    service = module.get<MovieWriterService>(MovieWriterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
