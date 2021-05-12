import { Test, TestingModule } from '@nestjs/testing';
import { MovieCharacterResolver } from './movie-character.resolver';
import { MovieCharacterService } from './movie-character.service';

describe('MovieCharacterResolver', () => {
  let resolver: MovieCharacterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieCharacterResolver, MovieCharacterService],
    }).compile();

    resolver = module.get<MovieCharacterResolver>(MovieCharacterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
