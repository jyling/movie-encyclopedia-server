import { Resolver, Query, Mutation, Args, Int, ResolveProperty } from '@nestjs/graphql';
import { MovieCharacterService } from './movie-character.service';
import { MovieCharacter } from './entities/movie.character.entity';
import { CreateMovieCharacterInput } from './dto/create-movie.character.input';

@Resolver(() => MovieCharacter)
export class MovieCharacterResolver {
  constructor(private readonly movieCharacterService: MovieCharacterService) {}

  @Mutation(() => MovieCharacter)
  createMovieCharacter(@Args('createMovieCharacterInput') createMovieCharacterInput: CreateMovieCharacterInput) {
    return this.movieCharacterService.create(createMovieCharacterInput);
  }

  @Query(() => [MovieCharacter], { name: 'MovieCharacter' })
  async findAllMovieCharacter() {
    return await this.movieCharacterService.findAll();
  }

  @Query(() => MovieCharacter, { name: 'MovieCharacter_find' })
  findOneMovieCharacter(@Args('id', { type: () => Int }) id: number) {
    return this.movieCharacterService.findOne(id);
  }
}
