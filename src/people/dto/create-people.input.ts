import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePeopleInput {
  @Field(() => String, { description: 'name of the people' })
  name: string;
}
