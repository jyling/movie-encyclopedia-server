import { CreateCharacterInput } from './create-character.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCharacterInput extends PartialType(CreateCharacterInput) {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  name: string;
}
