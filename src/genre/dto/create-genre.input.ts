import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGenreInput {
  @Field(() => String, { description: 'name of the genre' })
  name: string;

  @Field(() => String, { description: 'description of the genre' })
  description: string;
}
