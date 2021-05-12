import { CreateCharacterInput } from '../../character/dto/create-character.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMovieCharacterInput extends PartialType(CreateCharacterInput) {
  @Field(() => Number)
  id: number;

  @Field(() => Number, { description: 'Example field (placeholder)' })
  character_id: number;

  @Field(() => Number, { description: 'Example field (placeholder)' })
  movie_id: number;
}
