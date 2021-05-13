import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PeopleService } from './people.service';
import { People } from './entities/people.entity';
import { CreatePeopleInput } from './dto/create-people.input';
import { UpdatePeopleInput } from './dto/update-people.input';

@Resolver(() => People)
export class PeopleResolver {
  constructor(private readonly peopleService: PeopleService) {}

  @Mutation(() => People)
  createPeople(@Args('createPeopleInput') createPeopleInput: CreatePeopleInput) {
    return this.peopleService.create(createPeopleInput);
  }

  @Query(() => [People], { name: 'people' })
  findAll() {
    return this.peopleService.findAll();
  }

  @Query(() => People, { name: 'person_find' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.peopleService.findOne(id);
  }

  @Mutation(() => People)
  updatePeople(@Args('updatePeopleInput') updatePeopleInput: UpdatePeopleInput) {
    return this.peopleService.update(updatePeopleInput.id, updatePeopleInput);
  }

  @Mutation(() => People)
  removePeople(@Args('id', { type: () => Int }) id: number) {
    return this.peopleService.remove(id);
  }
}
