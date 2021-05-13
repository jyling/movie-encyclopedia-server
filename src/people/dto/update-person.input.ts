import { CreatePersonInput } from './create-person.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePersonInput extends PartialType(CreatePersonInput) {
  @Field(() => Int, { description: 'id of the people' })
  id: number;

  @Field(() => String, { description: 'name of the people' })
  name: string;
}
