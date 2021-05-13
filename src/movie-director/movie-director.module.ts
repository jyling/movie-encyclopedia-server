import { Module } from '@nestjs/common';
import { MovieDirectorService } from './movie-director.service';
import { MovieDirectorResolver } from './movie-director.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MovieDirectorResolver, MovieDirectorService]
})
export class MovieDirectorModule {}
