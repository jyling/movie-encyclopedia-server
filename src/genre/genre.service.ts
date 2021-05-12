import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';

@Injectable()
export class GenreService {
  private GenreInclude = {
    MovieGenre: {
      include: {
        Movie: true,
        Genre: true,
      }
    }
  }
  constructor(private prisma : PrismaService) {}
  create(createGenreInput: CreateGenreInput) {
    let { name, description } = createGenreInput;
    return this.prisma.genre.create({
      data: {
        name, description
      }
    })
  }

  findAll() {
    return this.prisma.genre.findMany({
      include: this.GenreInclude
    })
  }

  findOne(id: number) {
    return this.prisma.genre.findFirst({
      where: {id},
      include: this.GenreInclude
    })
  }

  update(id: number, updateGenreInput: UpdateGenreInput) {
    let {name, description} = updateGenreInput;
    return this.prisma.genre.update({
      where: {id},
      data: {
        name, description
      }
    })
  }

  remove(id: number) {
    return this.prisma.genre.delete({
      where: {id},
    })
  }
}
