import { Query, Resolver } from '@nestjs/graphql';
import { Movie } from 'src/models/movie.entity';
import { MovieService } from './movie.service';

@Resolver(of => Movie)
export class MovieResolver {
    constructor(private movieService : MovieService) {}

    @Query(returns => [Movie])
    movies() {
        return this.movieService.findAll();
    }
    
}
