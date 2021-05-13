import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMovieDirectorInput {
  @Field(() => Int, { description: 'people id of the movie director' })
  people_id: number;

  @Field(() => Int, { description: 'movie id of the movie director' })
  movie_id: number;
}
