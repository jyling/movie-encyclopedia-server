import { Test, TestingModule } from '@nestjs/testing';
import { MovieGenreResolver } from './movie-genre.resolver';
import { MovieGenreService } from './movie-genre.service';

describe('MovieGenreResolver', () => {
  let resolver: MovieGenreResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieGenreResolver, MovieGenreService],
    }).compile();

    resolver = module.get<MovieGenreResolver>(MovieGenreResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
