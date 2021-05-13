import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PeopleService } from './people.service';
import { Person } from './entities/person.entity';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';

@Resolver(() => Person)
export class PeopleResolver {
  constructor(private readonly peopleService: PeopleService) {}

  @Mutation(() => Person)
  createPerson(@Args('createPersonInput') createPersonInput: CreatePersonInput) {
    return this.peopleService.create(createPersonInput);
  }

  @Query(() => [Person], { name: 'people' })
  findAll() {
    return this.peopleService.findAll();
  }

  @Query(() => Person, { name: 'person_find' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.peopleService.findOne(id);
  }

  @Mutation(() => Person)
  updatePerson(@Args('updatePersonInput') updatePersonInput: UpdatePersonInput) {
    return this.peopleService.update(updatePersonInput.id, updatePersonInput);
  }

  @Mutation(() => Person)
  removePerson(@Args('id', { type: () => Int }) id: number) {
    return this.peopleService.remove(id);
  }
}
