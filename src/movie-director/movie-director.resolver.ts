import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MovieDirectorService } from './movie-director.service';
import { MovieDirector } from './entities/movie-director.entity';
import { CreateMovieDirectorInput } from './dto/create-movie-director.input';
import { UpdateMovieDirectorInput } from './dto/update-movie-director.input';

@Resolver(() => MovieDirector)
export class MovieDirectorResolver {
  constructor(private readonly movieDirectorService: MovieDirectorService) {}

  @Mutation(() => MovieDirector)
  createMovieDirector(@Args('createMovieDirectorInput') createMovieDirectorInput: CreateMovieDirectorInput) {
    return this.movieDirectorService.create(createMovieDirectorInput);
  }

  @Query(() => [MovieDirector], { name: 'movieDirector' })
  findAll() {
    return this.movieDirectorService.findAll();
  }

  @Query(() => MovieDirector, { name: 'movieDirector_find' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.movieDirectorService.findOne(id);
  }

  @Mutation(() => MovieDirector)
  updateMovieDirector(@Args('updateMovieDirectorInput') updateMovieDirectorInput: UpdateMovieDirectorInput) {
    return this.movieDirectorService.update(updateMovieDirectorInput.id, updateMovieDirectorInput);
  }

  @Mutation(() => MovieDirector)
  removeMovieDirector(@Args('id', { type: () => Int }) id: number) {
    return this.movieDirectorService.remove(id);
  }
}
