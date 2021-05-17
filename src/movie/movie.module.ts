import { ContentModule } from './../content/content.module';
import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ContentModule],
  providers: [MovieResolver, MovieService]
})
export class MovieModule {}
