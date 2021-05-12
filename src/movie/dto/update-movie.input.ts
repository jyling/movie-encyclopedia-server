import { CreateMovieInput } from './create-movie.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMovieInput extends PartialType(CreateMovieInput) {
  @Field(() => Number, { description: 'id of the movie' })
  id: number;

  @Field(() => String, { description: 'name of the movie' })
  name: string;

  @Field(() => Date, { description: 'release date of the movie' })
  releaseDate: Date;

  @Field(() => String, { description: 'description of the movie' })
  description: string;
}
