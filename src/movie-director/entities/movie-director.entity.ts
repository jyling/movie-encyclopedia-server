import { ObjectType, Field, Int } from '@nestjs/graphql';
import { People } from 'src/people/entities/people.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@ObjectType()
export class MovieDirector {
  @Field(() => Int, { description: 'id of the movie director' })
  id: number;

  @Field(() => Int, { description: 'people id of the movie director' })
  people_id: number;

  @Field(() => People, { description: 'Example field (placeholder)' })
  People: People;

  @Field(() => Int, { description: 'movie id of the movie director' })
  movie_id: number;

  @Field(() => Movie, { description: 'Example field (placeholder)' })
  Movie: Movie;
}
