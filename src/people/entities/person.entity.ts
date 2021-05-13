import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Person {
  @Field(() => Int, { description: 'id of the people' })
  id: number;

  @Field(() => String, { description: 'name of the people' })
  name: string;
}
