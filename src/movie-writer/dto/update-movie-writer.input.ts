import { CreateMovieWriterInput } from './create-movie-writer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMovieWriterInput extends PartialType(CreateMovieWriterInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { description: 'people id of the movie director' })
  people_id: number;

  @Field(() => Int, { description: 'movie id of the movie director' })
  movie_id: number;
}
