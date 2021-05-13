import { Injectable } from '@nestjs/common';
import { PeopleInclude } from 'src/helper/prisma.include';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';

@Injectable()
export class PeopleService {
  constructor(private prisma : PrismaService){}
  create(createPersonInput: CreatePersonInput) {
    let {name} = createPersonInput;
    return this.prisma.people.create({
      data: {
        name
      }
    })
  }

  findAll() {
    return this.prisma.people.findMany({
      include: PeopleInclude
    });
  }

  findOne(id: number) {
    return this.prisma.people.findFirst({
      where: {id},
      include: PeopleInclude
    })
  }

  update(id: number, updatePersonInput: UpdatePersonInput) {
    let {name} = updatePersonInput;
    return this.prisma.people.update({
      where: {id},
      data: {
        name
      }
    })
  }

  remove(id: number) {
    return this.prisma.people.delete({
      where: {id}
    });
  }
}
