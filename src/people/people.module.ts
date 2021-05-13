import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleResolver } from './people.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaService],
  providers: [PeopleResolver, PeopleService]
})
export class PeopleModule {}
