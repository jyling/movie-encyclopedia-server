import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, OneToOne, JoinColumn } from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
@ObjectType()
export class MovieImage {
    @PrimaryGeneratedColumn('uuid')
    @Field(type => String)
    id: string;
    
    @Column({ type: 'text', default: false, nullable: true })
    @Field(type => String)
    image_url: string;
    
    
    @OneToOne(() => Movie)
    @JoinColumn()
    @Field(type => Movie, {nullable: true})
    movie: Movie;
}