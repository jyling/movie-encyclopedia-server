import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMovieGenreInput {
  @Field(() => Int, { description: 'movie id of an movie' })
  movie_id: number;

  @Field(() => Int, { description: 'genre id of an movie' })
  genre_id: number
}
