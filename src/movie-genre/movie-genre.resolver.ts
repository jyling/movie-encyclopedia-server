import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MovieGenreService } from './movie-genre.service';
import { MovieGenre } from './entities/movie-genre.entity';
import { CreateMovieGenreInput } from './dto/create-movie-genre.input';
import { UpdateMovieGenreInput } from './dto/update-movie-genre.input';

@Resolver(() => MovieGenre)
export class MovieGenreResolver {
  constructor(private readonly movieGenreService: MovieGenreService) {}

  @Mutation(() => MovieGenre)
  createMovieGenre(@Args('createMovieGenreInput') createMovieGenreInput: CreateMovieGenreInput) {
    return this.movieGenreService.create(createMovieGenreInput);
  }

  @Query(() => [MovieGenre], { name: 'movieGenre' })
  findAll() {
    return this.movieGenreService.findAll();
  }

  @Query(() => MovieGenre, { name: 'movieGenre' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.movieGenreService.findOne(id);
  }

  @Mutation(() => MovieGenre)
  updateMovieGenre(@Args('updateMovieGenreInput') updateMovieGenreInput: UpdateMovieGenreInput) {
    return this.movieGenreService.update(updateMovieGenreInput.id, updateMovieGenreInput);
  }

  @Mutation(() => MovieGenre)
  removeMovieGenre(@Args('id', { type: () => Int }) id: number) {
    return this.movieGenreService.remove(id);
  }
}
