import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieImage } from 'src/models/movie.image.model';
import { Movie } from 'src/models/movie.model';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieImage])],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
