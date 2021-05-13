import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PeopleResolver } from './people.resolver';
import { PeopleService } from './people.service';

@Module({
  imports: [PrismaModule],
  providers: [PeopleResolver, PeopleService]
})
export class PeopleModule {}
