import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMovieCharacterInput {
  @Field(() => Number, { description: 'Example field (placeholder)' })
  character_id: number;

  @Field(() => Number, { description: 'Example field (placeholder)' })
  movie_id: number;
}
