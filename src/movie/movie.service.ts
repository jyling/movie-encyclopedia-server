import { BadRequestException, Injectable } from '@nestjs/common';
import { findInAndNotInDBString, findInDb } from 'src/helper/db.helper';
import { MovieInclude } from 'src/helper/prisma.include';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';

@Injectable()
export class MovieService {
  private MovieIncludes = {
    MovieCharacter: {
      include: {
        Character: true
      }
    }
  }
  constructor(private prisma : PrismaService) {
  }
  async create(createMovieInput: CreateMovieInput) {
    let {name, description, releasedDate, characters, genres, writers, directors} = createMovieInput;


    if (await this.findOneByName(name)) {
      throw new BadRequestException({
        name: `the movie with name of ${name} already exist`
      });
    }


    let [charactersInDb, charactersNotInDb] = await findInAndNotInDBString(this.prisma, "Character", "name", characters)
    let characterStoredInDb = null
    if (charactersNotInDb.length > 0) {
      characterStoredInDb = await this.prisma.character.createMany({
        data: charactersNotInDb.map(character => {return {name: character}})
      })
    }
    let charactersIds = await findInDb(this.prisma, "Character", "name", characters)


    let [genresInDb, genresNotInDb] = await findInAndNotInDBString(this.prisma, "Genre", "name", genres)
    let genreStoredInDb = null
    if (genresNotInDb.length > 0) {
      genreStoredInDb = await this.prisma.genre.createMany({
        data: genresNotInDb.map(genre => {return {name: genre}})
      })
    }
    let genresIds = await findInDb(this.prisma, "Genre", "name", genres)


    let [writersInDb, writersNotInDb] = await findInAndNotInDBString(this.prisma, "People", "name", writers)
    let writerStoredInDb = null
    if (writersNotInDb.length > 0) {
      writersNotInDb = await this.prisma.people.createMany({
        data: writersNotInDb.map(genre => {return {name: genre}})
      })
    }
    let writersIds = await findInDb(this.prisma, "People", "name", writers)



    let [directorsInDb, directorsNotInDb] = await findInAndNotInDBString(this.prisma, "People", "name", directors)
    console.log({writersInDb, writersNotInDb});
    let directorsStoredInDb = null
    if (directorsNotInDb.length > 0) {
      directorsStoredInDb = await this.prisma.people.createMany({
        data: directorsNotInDb.map(genre => {return {name: genre}})
      })
    }
    let directorsIds = await findInDb(this.prisma, "People", "name", directors)

    
    const createdMovie = await this.prisma.movie.create({
      data: {name, description, releasedDate}
    });
    
    //create linking
    if (charactersIds.length > 0) {
      await this.prisma.movieCharacter.createMany({
        data: charactersIds.map(character => {
          return {
            character_id: character.id,
            movie_id: createdMovie.id
          }
        })
      });
    }

    if (genresIds.length > 0) {
      await this.prisma.movieGenre.createMany({
        data: genresIds.map(genre => {
          return {
            genre_id: genre.id,
            movie_id: createdMovie.id
          }
        })
      });
    }

    if (writersIds.length > 0) {
      await this.prisma.movieWriter.createMany({
        data: writersIds.map(writer => {
          return {
            people_id: writer.id,
            movie_id: createdMovie.id
          }
        })
      });
    }

    if (directorsIds.length > 0) {
      await this.prisma.movieDirector.createMany({
        data: directorsIds.map(writer => {
          return {
            people_id: writer.id,
            movie_id: createdMovie.id
          }
        })
      });
    }

    return this.findOne(createdMovie.id);
  }

  findAll() {
    return this.prisma.movie.findMany({
      include: MovieInclude
    });
  }

  findOne(id: number) {
    return this.prisma.movie.findFirst({
      where: {id},
      include: MovieInclude
    })
  }

  findOneByName(name: string) {
    return this.prisma.movie.findFirst({
      where: {
        name: {
          equals: name.trim(),
          mode: "insensitive"
        }
      },
      include: MovieInclude
    })
  }

  update(id: number, updateMovieInput: UpdateMovieInput) {
    let {name, description, releasedDate, characters, genres, writers, directors} = updateMovieInput;
    console.log(updateMovieInput)
    return updateMovieInput;
    return this.prisma.movie.update({
      where: {id},
      data: updateMovieInput
    })
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
