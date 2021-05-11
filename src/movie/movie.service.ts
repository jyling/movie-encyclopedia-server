import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateMovieDTO } from 'src/dto/movie.dto';
import { Movie } from 'src/models/movie.model';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
    constructor(@InjectRepository(Movie) private movieRepo : Repository<Movie>) {}

    async findAll(){
        return await this.movieRepo.find();
    }

    async findOne(id : string){
        try {
            const found = await this.movieRepo.findOne({id});
            if (!found) {
                throw new Error("not found");
            }
            return await found;
        } catch (error) {
            throw new NotFoundException(null, "Could not find the movie")
        }
    }

    async update(id : string, updateMovieDto : UpdateMovieDTO){
        const found = await this.findOne(id);
        return await this.movieRepo.update({id}, updateMovieDto)
    }

    async remove(id){
        const found = await this.findOne(id);
        return await this.movieRepo.remove([found])
    }

}
