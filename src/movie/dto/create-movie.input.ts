import { InputType, Field } from '@nestjs/graphql';
import { ArrayMinSize, IsArray, IsDate, IsString, Length, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateMovieInput {
  @Field(() => String, { description: 'name of the movie' })
  @Length(3,32)
  name: string;

  @Field(() => String, { defaultValue: ""})
  image: string

  @Field(() => Date, { description: 'release date of the movie' })
  @IsDate()
  releasedDate: Date;

  @Field(() => String, { description: 'description of the movie' })
  @Length(3, 300)
  description: string;

  @Field(() => [String])
  @IsString({each: true})
  @ArrayMinSize(1)
  characters: string[]

  @Field(() => [String])
  @IsString({each: true})
  @ArrayMinSize(1)
  genres: string[]

  @Field(() => [String])
  @IsString({each: true})
  @ArrayMinSize(1)
  directors: string[]

  @Field(() => [String])
  @IsString({each: true})
  @ArrayMinSize(1)
  writers: string[]
}
