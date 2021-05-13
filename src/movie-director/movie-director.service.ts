import { Injectable } from '@nestjs/common';
import { MovieDirectorOrWriter } from 'src/helper/prisma.include';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDirectorInput } from './dto/create-movie-director.input';
import { UpdateMovieDirectorInput } from './dto/update-movie-director.input';

@Injectable()
export class MovieDirectorService {
  constructor(private prisma : PrismaService) {}
  create(createMovieDirectorInput: CreateMovieDirectorInput) {
    let {people_id, movie_id} = createMovieDirectorInput;
    return this.prisma.movieDirector.create({
      data: {
        people_id, movie_id
      }
    });
  }

  findAll() {
    return this.prisma.movieDirector.findMany({
      include: MovieDirectorOrWriter
    });
  }

  findOne(id: number) {
    return this.prisma.movieDirector.findFirst({
      where: {id},
      include: MovieDirectorOrWriter
    });
  }

  update(id: number, updateMovieDirectorInput: UpdateMovieDirectorInput) {
    let {people_id, movie_id} = updateMovieDirectorInput;

    return this.prisma.movieDirector.update({
      where: {id},
      data: {people_id, movie_id}
    });
  }

  remove(id: number) {
    return this.prisma.movieDirector.delete({
      where: {id},
    });
  }
}
