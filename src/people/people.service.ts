import { Injectable } from '@nestjs/common';
import { PeopleInclude } from 'src/helper/prisma.include';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePeopleInput } from './dto/create-people.input';
import { UpdatePeopleInput } from './dto/update-people.input';

@Injectable()
export class PeopleService {
  constructor(private prisma : PrismaService){}
  create(createPeopleInput: CreatePeopleInput) {
    let {name} = createPeopleInput;
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

  update(id: number, updatePeopleInput: UpdatePeopleInput) {
    let {name} = updatePeopleInput;
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
