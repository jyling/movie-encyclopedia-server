import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MovieWriterService } from './movie-writer.service';
import { MovieWriter } from './entities/movie-writer.entity';
import { CreateMovieWriterInput } from './dto/create-movie-writer.input';
import { UpdateMovieWriterInput } from './dto/update-movie-writer.input';

@Resolver(() => MovieWriter)
export class MovieWriterResolver {
  constructor(private readonly movieWriterService: MovieWriterService) {}

  @Mutation(() => MovieWriter)
  createMovieWriter(@Args('createMovieWriterInput') createMovieWriterInput: CreateMovieWriterInput) {
    return this.movieWriterService.create(createMovieWriterInput);
  }

  @Query(() => [MovieWriter], { name: 'movieWriter' })
  findAll() {
    return this.movieWriterService.findAll();
  }

  @Query(() => MovieWriter, { name: 'movieWriter' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.movieWriterService.findOne(id);
  }

  @Mutation(() => MovieWriter)
  updateMovieWriter(@Args('updateMovieWriterInput') updateMovieWriterInput: UpdateMovieWriterInput) {
    return this.movieWriterService.update(updateMovieWriterInput.id, updateMovieWriterInput);
  }

  @Mutation(() => MovieWriter)
  removeMovieWriter(@Args('id', { type: () => Int }) id: number) {
    return this.movieWriterService.remove(id);
  }
}
