import { Injectable } from '@nestjs/common';
import { GenreInclude } from 'src/helper/prisma.include';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';

@Injectable()
export class GenreService {
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
      include: GenreInclude
    })
  }

  findOne(id: number) {
    return this.prisma.genre.findFirst({
      where: {id},
      include: GenreInclude
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
