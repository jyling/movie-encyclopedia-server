import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { MovieImage } from './movie.image.entity';

@Entity()
@ObjectType()
export class Character {
    @PrimaryGeneratedColumn('uuid')
    @Field(type => String)
    id: string;

    @Column({ type: 'text', default: false })
    @Field(type => String)
    name: string;
}