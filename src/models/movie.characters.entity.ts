import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Character } from './character.entity';
import { Movie } from './movie.entity';
import { MovieImage } from './movie.image.entity';

@Entity()
@ObjectType()
export class MovieCharacter {
    @PrimaryGeneratedColumn('uuid')
    @Field(type => String)
    id: string;



    @OneToMany(() => Movie, (movie : Movie) => movie.movieCharacter)
    @JoinColumn()
    @Field(type => Character)
    public movie: Character


    @OneToOne(() => Character)
    @JoinColumn()
    @Field(type => Character)
    public character: Character
}