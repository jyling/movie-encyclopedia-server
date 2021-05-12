import { Injectable } from '@nestjs/common';
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
  create(createMovieInput: CreateMovieInput) {
    let {name, description, releasedDate} = createMovieInput;
    return this.prisma.movie.create({
      data: {name, description, releasedDate}
    });
  }

  findAll() {
    return this.prisma.movie.findMany({
      include: this.MovieIncludes
    });
  }

  findOne(id: number) {
    return this.prisma.movie.findFirst({
      where: {id},
      include: this.MovieIncludes
    })
  }

  update(id: number, updateMovieInput: UpdateMovieInput) {
    return this.prisma.movie.update({
      where: {id},
      data: updateMovieInput
    })
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
