import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Movie } from 'src/movie/entities/movie.entity';
import { Character } from '../../character/entities/character.entity';

@ObjectType()
export class MovieCharacter {
  @Field(() => Int, { description: 'Example field (placeholder)',  nullable: true })
  id: number;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  character_id: number;

  @Field(() => Character, { description: 'Example field (placeholder)' })
  Character: Character;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  movie_id: number;

  @Field(() => Movie, { description: 'Example field (placeholder)' })
  Movie: Movie;
}
