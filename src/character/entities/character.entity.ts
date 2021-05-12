import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MovieCharacter } from 'src/movie-character/entities/movie.character.entity';

@ObjectType()
export class Character {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String, {  })
  name: string;

  @Field(() => [MovieCharacter], {  })
  MovieCharacter: MovieCharacter[];
}
