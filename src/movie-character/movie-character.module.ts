import { Module } from '@nestjs/common';
import { MovieCharacterService } from './movie-character.service';
import { MovieCharacterResolver } from './movie-character.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MovieCharacterResolver, MovieCharacterService]
})
export class MovieCharacterModule {}
