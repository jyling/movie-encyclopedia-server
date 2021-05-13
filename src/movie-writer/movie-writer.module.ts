import { Module } from '@nestjs/common';
import { MovieWriterService } from './movie-writer.service';
import { MovieWriterResolver } from './movie-writer.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MovieWriterResolver, MovieWriterService]
})
export class MovieWriterModule {}
