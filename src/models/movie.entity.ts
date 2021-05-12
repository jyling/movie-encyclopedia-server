import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, OneToMany, JoinColumn } from 'typeorm';
import { MovieCharacter } from './movie.characters.entity';
import { MovieImage } from './movie.image.entity';

@Entity()
@ObjectType()
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    @Field(type => String)
    id: string;

    @Column({ type: 'varchar', default: false })
    @Field(type => String)
    name: string;

    @Column({ type: 'timestamptz', default: false })
    @Field(type => Date)
    releasedDate: Date;

    @Column({ type: 'text', default: false })
    @Field(type => String)
    description: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    @Field(type => Date)
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    @Field(type => Date)
    updatedAt: Date;

    @OneToMany(() => MovieImage, (movieImage : MovieImage) => movieImage.movie, {
        nullable: true
    })
    @JoinColumn()
    @Field(type => [MovieImage], { defaultValue: []})
    public images: MovieImage[]

    @OneToMany(() => MovieCharacter, (character : MovieCharacter) => character.movie, {
        nullable: true
    })
    @JoinColumn()
    @Field(type => [MovieCharacter], { defaultValue: []})
    public characters: MovieCharacter[]

}