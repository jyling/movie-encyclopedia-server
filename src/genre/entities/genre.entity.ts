import { MovieGenre } from './../../movie-genre/entities/movie-genre.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Genre {
  @Field(() => Int, { description: 'id of genre' , nullable : true})
  id: number;

  @Field(() => String, { description: 'name of genre' })
  name: string;

  @Field(() => String, { description: 'description of genre' })
  description: string;

  @Field(() => [MovieGenre], {  })
  MovieGenre: MovieGenre[];
}
