import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieImage } from 'src/models/movie.image.entity';
import { Movie } from 'src/models/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieImage])],
  controllers: [MovieController],
  providers: [MovieService, MovieResolver]
})
export class MovieModule {}
