import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MovieCharacter } from 'src/movie-character/entities/movie.character.entity';

@ObjectType()
export class Movie {
  @Field(() => Number, { description: 'id of the movie' })
  id: number;

  @Field(() => String, { description: 'name of the movie' })
  name: string;

  @Field(() => Date, { description: 'release date of the movie' })
  releasedDate: Date;

  @Field(() => String, { description: 'description of the movie' })
  description: string;

  @Field(() => [MovieCharacter])
  MovieCharacter: MovieCharacter[]
}