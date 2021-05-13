import { Test, TestingModule } from '@nestjs/testing';
import { MovieWriterResolver } from './movie-writer.resolver';
import { MovieWriterService } from './movie-writer.service';

describe('MovieWriterResolver', () => {
  let resolver: MovieWriterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieWriterResolver, MovieWriterService],
    }).compile();

    resolver = module.get<MovieWriterResolver>(MovieWriterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
