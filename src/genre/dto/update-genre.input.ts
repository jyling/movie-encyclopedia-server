import { CreateGenreInput } from './create-genre.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGenreInput extends PartialType(CreateGenreInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'name of the genre' })
  name: string;

  @Field(() => String, { description: 'description of the genre' })
  description: string;
}
