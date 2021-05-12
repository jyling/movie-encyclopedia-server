import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, OneToOne, JoinColumn } from 'typeorm';
import { Movie } from './movie.model';

@Entity()
export class MovieImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type: 'text', default: false })
    image_url: string;
    
    
    @OneToOne(() => Movie, {
        
    })
    @JoinColumn()
    Movie: Movie;
}