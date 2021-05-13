import { CreateMovieGenreInput } from './create-movie-genre.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMovieGenreInput extends PartialType(CreateMovieGenreInput) {
  @Field(() => Int, { description: 'id of movie genre' })
  id: number;

  @Field(() => Int, { description: 'movie id of an movie' })
  movie_id: number;

  @Field(() => Int, { description: 'genre id of an genre' })
  genre_id: number
}
