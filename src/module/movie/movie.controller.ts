import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMovieDTO, UpdateMovieDTO } from 'src/dto/movie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
    constructor(private movieService : MovieService) {}

  
    @Get()
    findAll() {
      return this.movieService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.movieService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateMovieDTO) {
      return this.movieService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.movieService.remove(id);
    }
}
