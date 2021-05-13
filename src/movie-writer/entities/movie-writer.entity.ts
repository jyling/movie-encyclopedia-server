import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Movie } from 'src/movie/entities/movie.entity';
import { People } from 'src/people/entities/people.entity';

@ObjectType()
export class MovieWriter {

  @Field(() => Int, { description: 'people id of the movie writer' })
  people_id: number;

  @Field(() => People, { description: 'people of the movie writer' })
  People: People;

  @Field(() => Int, { description: 'movie id of the movie writer' })
  movie_id: number;

  @Field(() => Movie, { description: 'movie of the movie writer' })
  Movie: Movie;
}
