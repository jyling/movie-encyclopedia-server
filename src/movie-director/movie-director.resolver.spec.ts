import { Test, TestingModule } from '@nestjs/testing';
import { MovieDirectorResolver } from './movie-director.resolver';
import { MovieDirectorService } from './movie-director.service';

describe('MovieDirectorResolver', () => {
  let resolver: MovieDirectorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieDirectorResolver, MovieDirectorService],
    }).compile();

    resolver = module.get<MovieDirectorResolver>(MovieDirectorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
