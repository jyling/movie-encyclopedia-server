import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';
import { CharacterInclude } from 'src/helper/prisma.include';

@Injectable()
export class CharacterService {


  constructor(private prima : PrismaService) {}
  create(createCharacterInput: CreateCharacterInput) {
    let {name} = createCharacterInput;
    return this.prima.character.create({
      data: {name},
    })
  }

  findAll() {
    return this.prima.character.findMany({
      include : CharacterInclude
    });
  }

  findOne(id: number) {
    return this.prima.character.findFirst({
      where: {id},
      include : CharacterInclude
    });
  }

  update(id: number, updateCharacterInput: UpdateCharacterInput) {
    let {name} = UpdateCharacterInput;

    return this.prima.character.update({
      where: {id},
      data: {name}
    })
  }

  remove(id: number) {
    return this.prima.character.delete({
      where: {id}
    })
  }

  ////////////////////////////////////////////////////////////////////////

}
