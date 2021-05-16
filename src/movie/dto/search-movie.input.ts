import { InputType, Field, Int } from '@nestjs/graphql';
import { ArrayMinSize, IsArray, IsDate, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SearchMovieInput {
  @Field(() => Int, { description: 'name of the movie', nullable: true})
  @IsOptional()
  id?: number;

  @Field(() => String, { description: 'name of the movie', nullable: true})
  @IsOptional()
  name?: string;

  @Field(() => Date, { description: 'release date of the movie', nullable: true})
  @IsOptional()
  releasedDate?: Date;

  @Field(() => String, { description: 'description of the movie', nullable: true})
  @IsOptional()
  description?: string;

  @Field(() => [String], { nullable: true})
  @IsOptional()
  @IsString({each: true})
  characters?: string[]

  @Field(() => [String], { nullable: true})
  @IsOptional()
  @IsString({each: true})
  genres?: string[]

  @Field(() => [String], { nullable: true})
  @IsOptional()
  @IsString({each: true})
  directors?: string[]

  @Field(() => [String], { nullable: true})
  @IsOptional()
  @IsString({each: true})
  writers?: string[]
}