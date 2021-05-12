import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Movie } from './movie.entity';
import { MovieImage } from './movie.image.entity';
import { People } from './people.entity';

@Entity()
@ObjectType()
export class MovieDirector {
    @PrimaryGeneratedColumn('uuid')
    @Field(type => String)
    id: string;

    @OneToOne(() => Movie)
    @JoinColumn()
    @Field(type => Movie)
    movie: Movie;

    @OneToOne(() => People)
    @JoinColumn()
    @Field(type => People)
    people: People;
}