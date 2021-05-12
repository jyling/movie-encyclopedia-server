import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCharacterInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string
}
