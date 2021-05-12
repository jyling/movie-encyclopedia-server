import { Test, TestingModule } from '@nestjs/testing';
import { MovieCharacterService } from './movie-character.service';

describe('MovieCharacterService', () => {
  let service: MovieCharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieCharacterService],
    }).compile();

    service = module.get<MovieCharacterService>(MovieCharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
