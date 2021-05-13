import { CreatePeopleInput } from './create-people.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePeopleInput extends PartialType(CreatePeopleInput) {
  @Field(() => Int, { description: 'id of the people' })
  id: number;

  @Field(() => String, { description: 'name of the people' })
  name: string;
}
