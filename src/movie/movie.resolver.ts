import { DeleteMovieOutput } from './dto/delete-movie.output';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { SearchMovieInput } from './dto/search-movie.input';
import { MovieSearch } from './entities/movie.search.entity';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Mutation(() => Movie)
  createMovie(@Args('createMovieInput', {nullable: true}) createMovieInput: CreateMovieInput) {
    return this.movieService.create(createMovieInput);
  }

  @Query(() => [Movie], { name: 'movie' })
  findAll() {
    return this.movieService.findAll();
  }

  @Query(() => Movie, { name: 'movie_find' })
  findOne(@Args('id', { type : () => Int}) id : number) {
    return this.movieService.findOne(id);
  }

  @Query(() =>  MovieSearch, { name: 'movies' })
  findMany(@Args('searchMovieInput', {nullable: true}) searchMovieInput: SearchMovieInput, @Args('page', {defaultValue: 1, type: () => Int}) page: number,@Args('limit', {defaultValue: 100, type: () => Int}) limit: number) {
    return this.movieService.findMany(searchMovieInput, page, limit);
  }

  @Mutation(() => Movie)
  updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return this.movieService.update(updateMovieInput.id, updateMovieInput);
  }

  @Mutation(() => DeleteMovieOutput)
  removeMovie(@Args('id', { type: () => Int }) id: number) {
    return this.movieService.remove(id);
  }
}
