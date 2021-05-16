import { MovieDirector } from './../movie-director/entities/movie-director.entity';
import { MovieWriter } from './../movie-writer/entities/movie-writer.entity';
import { MovieGenre } from './../movie-genre/entities/movie-genre.entity';
import { Character } from './../character/entities/character.entity';
import { MovieCharacter } from './../movie-character/entities/movie.character.entity';
import { MovieInclude } from './../helper/prisma.include';
import { Pagination } from './entities/pagination.entity';
import { SearchMovieInput } from './dto/search-movie.input';
import { BadRequestException, Injectable } from '@nestjs/common';
import { findInAndNotInDBString, findInDb } from 'src/helper/db.helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { isCompositeType } from 'graphql';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  
  constructor(private prisma : PrismaService) {
  }

  async insertIfNotExist(tableName: string, columnName: string, inputs : string[]) {
    let [InDb, NotInDb] = await findInAndNotInDBString(this.prisma, tableName, columnName, inputs)
    if (NotInDb.length > 0) {
      await this.prisma[tableName.toLowerCase()].createMany({
        data: NotInDb.map(item => {return {name: item}})
      })
    }
    return await findInDb(this.prisma, tableName, columnName, inputs)
  }
  async create(createMovieInput: CreateMovieInput) {
    let {name, description, releasedDate, characters, genres, writers, directors} = createMovieInput;

    if (await this.findOneByName(name)) {
      throw new BadRequestException({
        name: `the movie with name of ${name} already exist`
      });
    }

    let charactersIds = await this.insertIfNotExist("Character", "name", characters)
    let genresIds = await this.insertIfNotExist("Genre", "name", genres)
    let writersIds = await this.insertIfNotExist("People", "name", writers)
    let directorsIds = await this.insertIfNotExist("People", "name", directors)

    console.log({
      charactersIds,
      genresIds,
      writersIds,
      directorsIds
    })
    
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

  async findMany(searchMovieInput : SearchMovieInput, page: number = 1, limit : number = 100 ) {
    
  // name?: string;
  // releasedDate?: Date;
  // description?: string;
  // characters?: string[]
  // genres?: string[]
  // directors?: string[]
  // writers?: string[]

  const where = {}
  where["AND"] = []
  if (searchMovieInput) {
    if (searchMovieInput.id) {
    where["id"] = searchMovieInput.id
  }
  if (searchMovieInput.name) {
    where["name"] = {
      contains: searchMovieInput.name.trim(),
      mode: 'insensitive'
    }
  }


  if (searchMovieInput.characters) {
    const self = this;
    const allCharacterWithId = searchMovieInput.characters.map(async(name) => await self.prisma.character.findFirst({where: {name: {equals: name, mode : "insensitive"}}}))
    const and = allCharacterWithId.map(async(character) => {
      const characterObj = (await character)
      return {
        MovieCharacter: {
          some: {
            character_id: characterObj.id
          }
        }
      }
    });
    where["AND"] = [...where["AND"], ...await Promise.all(and)];
  }

  if (searchMovieInput.writers) {
    const self = this;
    const allPeopleWithId = searchMovieInput.writers.map(async(name) => await self.prisma.people.findFirst({where: {name: {equals: name, mode : "insensitive"}}}))
    const and = allPeopleWithId.map(async(people) => {
      const peopleObj = (await people)
      return {
        MovieWriter: {
          some: {
            people_id: peopleObj.id
          }
        }
      }
    });
    where["AND"] = [...where["AND"], ...await Promise.all(and)];
  }

  if (searchMovieInput.releasedDate) {
    console.log(searchMovieInput.releasedDate)
  }

  if (searchMovieInput.directors) {
    const self = this;
    const allPeopleWithId = searchMovieInput.directors.map(async(name) => await self.prisma.people.findFirst({where: {name: {equals: name, mode : "insensitive"}}}))
    const and = allPeopleWithId.map(async(people) => {
      const peopleObj = (await people)
      return {
        MovieDirector: {
          some: {
            people_id: peopleObj.id
          }
        }
      }
    });
    where["AND"] = [...where["AND"], ...await Promise.all(and)];
  }

  if (searchMovieInput.genres) {
    const self = this;
    const allGenreWithId = searchMovieInput.genres.map(async(name) => await self.prisma.genre.findFirst({where: {name: {equals: name, mode : "insensitive"}}}))
    const and = allGenreWithId.map(async(genre) => {
      const genreObj = (await genre)
      return {
        MovieGenre: {
          some: {
            genre_id: genreObj.id
          }
        }
      }
    });
    where["AND"] = [...where["AND"], ...await Promise.all(and)];
  }
  }

  const limitSafe = (limit || 1)
  const pageSafe = (page || 1)

  const offset = (limitSafe * pageSafe) - limitSafe ;
  console.log({offset, limitSafe, pageSafe})
  const result = await this.prisma.movie.findMany({
    where,
    include: MovieInclude,
    skip: offset,
    take: offset + limitSafe
  })

  const count = await this.prisma.movie.findMany({
    where,
  })


  let totalFilteredCount = count.length
  let totalPageNumber = Math.ceil(totalFilteredCount / limit)
  const PaginationObj : Pagination = {
    page: pageSafe, 
    totalPage: totalPageNumber  
  }
  return {Movie: result, pagination : PaginationObj};
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

  async update(id: number, updateMovieInput: UpdateMovieInput) {
    let {name, description, releasedDate, characters, genres, writers, directors} = updateMovieInput;
    let movie = null
    
      movie = await this.prisma.movie.findFirst({
        where: {id},
        include: MovieInclude
      })
      
    if (!movie) {
      throw new BadRequestException({
        id: `could not find movie with the id of ${id}`
      });
    }

    if (movie.name != name) {
      if (await this.findOneByName(name)) {
        throw new BadRequestException({
          name: `the movie with name of ${name} already exist`
        });
      }
    }

    let charactersIds = await this.insertIfNotExist("Character", "name", characters)
    let genresIds = await this.insertIfNotExist("Genre", "name", genres)
    let writersIds = await this.insertIfNotExist("People", "name", writers)
    let directorsIds = await this.insertIfNotExist("People", "name", directors)

    const originalMovie = JSON.parse(JSON.stringify(movie))
    const characterRelationToBeRemoved = movie
    .MovieCharacter
    .filter(characterData => {
      const idOnly = charactersIds.map(character => character.id)
      return idOnly.indexOf(characterData.character_id) == -1
    }).map(data => data.id)

    const genreRelationToBeRemoved = movie
    .MovieGenre
    .filter(genreData => {
      const idOnly = genresIds.map(genre => genre.id)
      return idOnly.indexOf(genreData.genre_id) == -1
    }).map(data => data.id)

    const writerRelationToBeRemoved = movie
    .MovieWriter
    .filter(writerData => {
      const idOnly = writersIds.map(people => people.id)
      return idOnly.indexOf(writerData.people_id) == -1
    }).map(data => data.id)

    const directorRelationToBeRemoved = movie
    .MovieDirector
    .filter(directorData => {
      const idOnly = directorsIds.map(genre => genre.id)
      return idOnly.indexOf(directorData.people_id) == -1
    }).map(data => data.id)

    if (characterRelationToBeRemoved.length > 0) await this.deleteRelation("movieCharacter", characterRelationToBeRemoved)
    if (genreRelationToBeRemoved.length > 0) await this.deleteRelation("movieGenre", genreRelationToBeRemoved)
    if (writerRelationToBeRemoved.length > 0) await this.deleteRelation("movieWriter", writerRelationToBeRemoved)
    if (directorRelationToBeRemoved.length > 0) await this.deleteRelation("movieDirector", directorRelationToBeRemoved)

    console.log(movie.MovieCharacter.map(cd => cd.character_id))
    const newCharacterRelation = charactersIds.filter(compare => movie.MovieCharacter.map(cd => cd.character_id).indexOf(compare.id) == -1)
    const newGenreRelation = genresIds.filter(compare => movie.MovieGenre.map(cd => cd.genre_id).indexOf(compare.id) == -1)

    const newWriterRelation = writersIds.filter(compare => movie.MovieWriter.map(cd => cd.people_id).indexOf(compare.id) == -1)
    const newDirectorRelation = directorsIds.filter(compare => movie.MovieDirector.map(cd => cd.people_id).indexOf(compare.id) == -1)

    
    if (newCharacterRelation.length > 0) {
      await this.prisma.movieCharacter.createMany({
        data: newCharacterRelation.map(character => {
          return {
            character_id: character.id,
            movie_id: movie.id
          }
        })
      });
    }

    if (newGenreRelation.length > 0) {
      await this.prisma.movieGenre.createMany({
        data: newGenreRelation.map(genre => {
          return {
            genre_id: genre.id,
            movie_id: movie.id
          }
        })
      });
    }

    if (newWriterRelation.length > 0) {
      await this.prisma.movieWriter.createMany({
        data: newWriterRelation.map(writer => {
          return {
            people_id: writer.id,
            movie_id: movie.id
          }
        })
      });
    }

    if (newDirectorRelation.length > 0) {
      await this.prisma.movieDirector.createMany({
        data: newDirectorRelation.map(writer => {
          return {
            people_id: writer.id,
            movie_id: movie.id
          }
        })
      });
    }

    await this.prisma.movie.update({
      where: {id},
      data: {
        name: name,
        description: description,
        releasedDate: releasedDate
      }    })
    return this.prisma.movie.findFirst({
      where: {id},
      include: MovieInclude
    });
  }

  async deleteRelation(tableName, ids : number[]) {
    return await this.prisma[tableName].deleteMany({
      where: {
        AND: ids.map(id => { 
          return {
          id : id,
        }})
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
