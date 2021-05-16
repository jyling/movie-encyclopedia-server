import { CreateMovieInput } from './create-movie.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class UpdateMovieInput extends PartialType(CreateMovieInput) {
  @Field(() => Number, { description: 'id of the movie' })
  @IsInt()
  id: number;
}
