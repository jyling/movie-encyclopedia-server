import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, OneToOne, JoinColumn } from 'typeorm';
import { Movie } from './movie.entity';
import { Genre } from './genre.entity';

@Entity()
@ObjectType()
export class MovieGenre {
    @PrimaryGeneratedColumn('uuid')
    @Field(type => String)
    id: string;
    
    @OneToOne(() => Movie)
    @JoinColumn()
    @Field(type => Movie)
    movie: Movie;
    
    
    @OneToOne(() => Genre)
    @JoinColumn()
    @Field(type => Genre)
    genre: Genre;
}