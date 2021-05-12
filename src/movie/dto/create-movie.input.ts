import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field(() => String, { description: 'name of the movie' })
  name: string;

  @Field(() => Date, { description: 'release date of the movie' })
  releasedDate: Date;

  @Field(() => String, { description: 'description of the movie' })
  description: string;
}
