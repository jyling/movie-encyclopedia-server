import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MovieCharacter } from 'src/movie-character/entities/movie.character.entity';
import { MovieDirector } from 'src/movie-director/entities/movie-director.entity';
import { MovieGenre } from 'src/movie-genre/entities/movie-genre.entity';
import { MovieWriter } from 'src/movie-writer/entities/movie-writer.entity';

@ObjectType()
export class Pagination {
  @Field(() => Number, { description: 'current page number' , defaultValue : 1})
  page: number;

  @Field(() => Number, { description: 'total page of the pagination' })
  totalPage: number;
}
