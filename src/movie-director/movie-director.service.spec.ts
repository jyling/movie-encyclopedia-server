import { Test, TestingModule } from '@nestjs/testing';
import { MovieDirectorService } from './movie-director.service';

describe('MovieDirectorService', () => {
  let service: MovieDirectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieDirectorService],
    }).compile();

    service = module.get<MovieDirectorService>(MovieDirectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
