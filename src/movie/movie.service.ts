import { DeleteMovieOutput } from './dto/delete-movie.output';
import { ContentService } from './../content/content.service';
import { MovieDirector } from './../movie-director/entities/movie-director.entity';
import { MovieWriter } from './../movie-writer/entities/movie-writer.entity';
import { MovieGenre } from './../movie-genre/entities/movie-genre.entity';
import { Character } from './../character/entities/character.entity';
import { MovieCharacter } from './../movie-character/entities/movie.character.entity';
import { MovieInclude } from './../helper/prisma.include';
import { Pagination } from './entities/pagination.entity';
import { SearchMovieInput } from './dto/search-movie.input';
import { BadRequestException, HttpCode, HttpException, Injectable } from '@nestjs/common';
import { findInAndNotInDBString, findInDb } from 'src/helper/db.helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { isCompositeType } from 'graphql';
import { Movie } from './entities/movie.entity';
import { People } from 'src/people/entities/people.entity';
import { STATUS_CODES } from 'http';

@Injectable()
export class MovieService {

  constructor(private prisma: PrismaService, private contentService: ContentService) {
  }

  async insertIfNotExist(tableName: string, columnName: string, inputs: string[]) {
    let [InDb, NotInDb] = await findInAndNotInDBString(this.prisma, tableName, columnName, inputs)
    if (NotInDb.length > 0) {
      await this.prisma[tableName.toLowerCase()].createMany({
        data: NotInDb.map(item => { return { name: item } })
      })
    }
    return await findInDb(this.prisma, tableName, columnName, inputs)
  }

  async getRelation(inputs, targetDBName, targetDBColumn, relationName, relationColumn) {
    const self = this;
    const allPeopleWithId = inputs.map(async (value) => {
      let find = {}
      find[targetDBColumn] = { equals: value, mode: "insensitive" }
      return await self.prisma[targetDBName].findFirst({ where: find })
    })
    const and = allPeopleWithId.map(async (people, index) => {
      const peopleObj = (await people)
      let find = {}
      let relationColumnObj = {}
      try {
        relationColumnObj[relationColumn] = peopleObj.id
        find[relationName] = { some: relationColumnObj }
        return find;
      } catch (error) {
        throw new Error(`could not find ${inputs[index]} in ${targetDBName}`)
      }
    });

    return Promise.all(and)

  }



  async create(createMovieInput: CreateMovieInput) {
    let { name, image, description, releasedDate, characters, genres, writers, directors } = createMovieInput;

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

    var newMovieObj = {
      data: { name, description, releasedDate }
    }
    if (image != "") {
      const result = await this.contentService.addImage64(image);
      if (result) {
        newMovieObj.data["imageURL"] = result.tempLink
      }
    }

    const createdMovie = await this.prisma.movie.create(newMovieObj);

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
      where: { id },
      include: MovieInclude
    })
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  async findMany(searchMovieInput: SearchMovieInput, page: number = 1, limit: number = 100) {
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
          contains: searchMovieInput.name,
          mode: 'insensitive'
        }
      }

      if (searchMovieInput.description) {
        where["description"] = {
          contains: searchMovieInput.description.trim(),
          mode: 'insensitive'
        }
      }


      if (searchMovieInput.characters) {
          try {
            const characterResult = await this.getRelation(searchMovieInput.characters, "character", "name", "MovieCharacter", "character_id");
            where["AND"] = [...where["AND"], ...characterResult];
          } catch (error) {
            throw new BadRequestException(error.message);
          }
      }

      if (searchMovieInput.writers) {
        try {
          const characterResult = await this.getRelation(searchMovieInput.writers, "people", "name", "MovieWriter", "people_id");
          where["AND"] = [...where["AND"], ...characterResult];
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }

      if (searchMovieInput.directors) {
        try {
          const characterResult = await this.getRelation(searchMovieInput.directors, "people", "name", "MovieDirector", "people_id");
          where["AND"] = [...where["AND"], ...characterResult];
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }

      if (searchMovieInput.genres) {
        try {
          const characterResult = await this.getRelation(searchMovieInput.genres, "genre", "name", "MovieGenre", "genre_id");
          where["AND"] = [...where["AND"], ...characterResult];
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }
    }

    const limitSafe = (limit || 1)
    const pageSafe = (page || 1)

    const offset = (limitSafe * pageSafe) - limitSafe;
    const result = await this.prisma.movie.findMany({
      where,
      include: MovieInclude,
      skip: offset,
      take: limitSafe
    })

    
    const count = await this.prisma.movie.findMany({
      where,
    })


    let totalFilteredCount = count.length
    let totalPageNumber = Math.ceil(totalFilteredCount / limit)
    const PaginationObj: Pagination = {
      page: pageSafe,
      totalPage: totalPageNumber
    }

    return { Movie: result, pagination: PaginationObj };
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
    let { name, image, description, releasedDate, characters, genres, writers, directors } = updateMovieInput;
    let movie = null

    movie = await this.prisma.movie.findFirst({
      where: { id },
      include: MovieInclude
    })

    if (!movie) {
      throw new BadRequestException({
        id: `could not find movie with the id of ${id}`
      });
    }

    if (movie.name != name) {
      const found = await this.findOneByName(name)
      if (found) {
        if (found.id != movie.id) {
          throw new BadRequestException({
            name: `the movie with name of ${name} already exist`
          });
        }
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

    var updateMovieData = { name, description, releasedDate }
    if (
      movie.imageURL != "" 
      && !image.startsWith("https://storage.googleapis.com/movie-encyclopedia-bdcbd.appspot.com/images/")
      && image != ""
      ) {
      console.log(movie.imageURL.split('/')[movie.imageURL.split('/').length - 1].split("?")[0].split("/"))
      const filePath = "images/" + movie.imageURL.split('/')[movie.imageURL.split('/').length - 1].split("?")[0]
      const newContent = await this.contentService.replaceImage64(filePath, image)
      if (newContent) {
        updateMovieData["imageURL"] = newContent.tempLink;
      }
    }
    else if (movie.imageURL == "" && image != "") {
      const result = await this.contentService.addImage64(image);
      if (result) {
        updateMovieData["imageURL"] = result.tempLink
      }
    }
    else if (image == "" && movie.imageURL != "") {
      console.log("delete")
      const filePath = movie.imageURL.split('/')[movie.imageURL.split('/').length - 1].split("?")[0]
      await this.contentService.deleteImage(filePath)
      updateMovieData["imageURL"] = "";
    }

    await this.prisma.movie.update({
      where: { id },
      data: updateMovieData
    })
    return this.prisma.movie.findFirst({
      where: { id },
      include: MovieInclude
    });
  }

  async deleteRelation(tableName, ids: number[]) {

    const unresolved = ids.map(async(id) => {
      return await this.prisma[tableName].delete({
        where: {
              id: id,
            }
      })
    })
    
    return await Promise.all(unresolved)
  }

  async remove(id: number) {
    const movie = await this.findOne(id)
    if (!movie) {
      throw new BadRequestException("Could not find the movie")
    }
    if (movie.imageURL) {
      await this.contentService.deleteImage(movie.imageURL.split('/')[movie.imageURL.split('/').length - 1].split("?")[0])
    }
    await this.prisma.movie.delete({
      where: {
        id: movie.id
      }
    })
    const result : DeleteMovieOutput  = {
      id: movie.id
    }
    return  result
  }
}
