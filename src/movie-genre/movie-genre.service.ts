import { Injectable } from '@nestjs/common';
import { MovieGenreInclude } from 'src/helper/prisma.include';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieGenreInput } from './dto/create-movie-genre.input';
import { UpdateMovieGenreInput } from './dto/update-movie-genre.input';

@Injectable()
export class MovieGenreService {
  constructor(private prisma : PrismaService) {}
  
  create(createMovieGenreInput: CreateMovieGenreInput) {
    let { movie_id, genre_id } = createMovieGenreInput;
    return this.prisma.movieGenre.create({
      data: {
        movie_id, genre_id
      }
    })
  }

  findAll() {
    return this.prisma.movieGenre.findMany({
      include: MovieGenreInclude
    })
  }

  findOne(id: number) {
    return this.prisma.movieGenre.findFirst({
      where: {id},
      include: MovieGenreInclude
    })
  }

  update(id: number, updateMovieGenreInput: UpdateMovieGenreInput) {
    let { movie_id, genre_id } = updateMovieGenreInput;
    return this.prisma.movieGenre.update({
      where: {id},
      data: {
        movie_id, genre_id
      }
    })
  }

  remove(id: number) {
    return this.prisma.movieGenre.delete({
      where: {id}
    })
  }
}
