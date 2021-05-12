import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Character {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String, {  })
  name: string;
}
