import { Injectable } from '@nestjs/common';
import { MovieDirectorOrWriter } from 'src/helper/prisma.include';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieWriterInput } from './dto/create-movie-writer.input';
import { UpdateMovieWriterInput } from './dto/update-movie-writer.input';

@Injectable()
export class MovieWriterService {
  constructor(private prisma : PrismaService){}
  create(createMovieWriterInput: CreateMovieWriterInput) {
    let { people_id, movie_id } = createMovieWriterInput;
    return this.prisma.movieWriter.create({
      data: {
        people_id, movie_id
      }
    });
  }

  findAll() {
    return this.prisma.movieWriter.findMany({
      include: MovieDirectorOrWriter
    });
  }

  findOne(id: number) {
    return this.prisma.movieWriter.findFirst({
      where: {id},
      include: MovieDirectorOrWriter
    });
  }

  update(id: number, updateMovieWriterInput: UpdateMovieWriterInput) {
    let { people_id, movie_id } = updateMovieWriterInput;
    return this.prisma.movieWriter.update({
      where: {id},
      data: {
        people_id, movie_id
      }
    });
  }

  remove(id: number) {
    return this.prisma.movieWriter.delete({
      where: {id},
    });
  }
}
