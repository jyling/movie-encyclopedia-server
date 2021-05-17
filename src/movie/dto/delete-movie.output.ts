import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteMovieOutput {
  @Field(() => Int)
  id: number
}
