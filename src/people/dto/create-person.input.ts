import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePersonInput {
  @Field(() => String, { description: 'name of the people' })
  name: string;
}
