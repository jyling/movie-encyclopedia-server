import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Genre } from 'src/genre/entities/genre.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@ObjectType()
export class MovieGenre {
  @Field(() => Int, { description: 'id of Movie Genre' })
  id: number;

  @Field(() => Int, { description: 'movie id of Movie Genre' })
  movie_id: number;

  @Field(() => Movie, { description: 'movie of Movie Genre' })
  Movie: Movie;

  @Field(() => Int, { description: 'movie id of Movie Genre' })
  genre_id: number;
  
  @Field(() => Genre, { description: 'genre of Movie Genre' })
  Genre: Genre;
}
