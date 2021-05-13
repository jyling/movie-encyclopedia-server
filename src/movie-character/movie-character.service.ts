import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieCharacterInput } from './dto/create-movie.character.input';
import { UpdateMovieCharacterInput } from './dto/update-movie.character.input';
import { MovieCharacterInclude } from 'src/helper/prisma.include'
@Injectable()
export class MovieCharacterService {
 
  constructor(private prima : PrismaService) {}

  create(createMovieCharacterInput: CreateMovieCharacterInput) {
    let {character_id, movie_id} = createMovieCharacterInput
    return this.prima.movieCharacter.create({
      data: {
        character_id,
        movie_id
      }
    });
  }

  async findAll() {
    return await this.prima.movieCharacter.findMany({
      include: MovieCharacterInclude
    });
  }

  findOne(id: number) {
    return this.prima.movieCharacter.findFirst({
      where: {id},
      include: MovieCharacterInclude
    });
  }

  update(id: number, updateMovieCharacterInput: UpdateMovieCharacterInput) {
    let {character_id, movie_id} = updateMovieCharacterInput
    return this.prima.movieCharacter.update({
      where: {id},
      data: {
        character_id,
        movie_id
      }
    });
  }

  remove(id: number) {
    return this.prima.movieCharacter.delete({
      where: {id}
    })
  }


}
