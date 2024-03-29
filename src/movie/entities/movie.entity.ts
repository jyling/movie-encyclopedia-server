import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MovieCharacter } from 'src/movie-character/entities/movie.character.entity';
import { MovieDirector } from 'src/movie-director/entities/movie-director.entity';
import { MovieGenre } from 'src/movie-genre/entities/movie-genre.entity';
import { MovieWriter } from 'src/movie-writer/entities/movie-writer.entity';

@ObjectType()
export class Movie {
  @Field(() => Number, { description: 'id of the movie' })
  id: number;

  @Field(() => String)
  imageURL: string;

  @Field(() => String, { description: 'name of the movie' })
  name: string;

  @Field(() => Date, { description: 'release date of the movie' })
  releasedDate: Date;

  @Field(() => String, { description: 'description of the movie' })
  description: string;

  @Field(() => [MovieCharacter])
  MovieCharacter: MovieCharacter[]

  @Field(() => [MovieGenre])
  MovieGenre: MovieGenre[]

  @Field(() => [MovieDirector])
  MovieDirector: MovieDirector[]

  
  @Field(() => [MovieWriter])
  MovieWriter: MovieWriter[]
}
