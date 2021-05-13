import { Module } from '@nestjs/common';
import { MovieGenreService } from './movie-genre.service';
import { MovieGenreResolver } from './movie-genre.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MovieGenreResolver, MovieGenreService]
})
export class MovieGenreModule {}
