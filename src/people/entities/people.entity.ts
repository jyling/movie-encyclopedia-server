import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MovieDirector } from 'src/movie-director/entities/movie-director.entity';
import { MovieWriter } from 'src/movie-writer/entities/movie-writer.entity';

@ObjectType()
export class People {
  @Field(() => Int, { description: 'id of the people' })
  id: number;

  @Field(() => String, { description: 'name of the people' })
  name: string;

  @Field(() => [MovieDirector])
  MovieDirector: MovieDirector[]
  
  @Field(() => [MovieWriter])
  MovieWriter: MovieWriter[]
}
