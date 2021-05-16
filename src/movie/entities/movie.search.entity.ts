import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MovieCharacter } from 'src/movie-character/entities/movie.character.entity';
import { MovieDirector } from 'src/movie-director/entities/movie-director.entity';
import { MovieGenre } from 'src/movie-genre/entities/movie-genre.entity';
import { MovieWriter } from 'src/movie-writer/entities/movie-writer.entity';
import { Movie } from './movie.entity';
import { Pagination } from './pagination.entity';

@ObjectType()
export class MovieSearch {
  @Field(() => [Movie], { description: 'id of the movie' })
  Movie: Movie[];

  @Field(() => Pagination, { description: 'name of the movie' })
  pagination: Pagination;
}
