import { CreateMovieDirectorInput } from './create-movie-director.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMovieDirectorInput extends PartialType(CreateMovieDirectorInput) {
  @Field(() => Int, { description: 'id of the movie director' })
  id: number;

  @Field(() => Int, { description: 'people id of the movie director' })
  people_id: number;

  @Field(() => Int, { description: 'movie id of the movie director' })
  movie_id: number;
}
