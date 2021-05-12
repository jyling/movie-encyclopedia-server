import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, OneToMany, JoinColumn } from 'typeorm';
import { MovieCharacter } from './movie.characters.entity';
import { MovieDirector } from './movie.director.entity';
import { MovieGenre } from './movie.genre.entity';
import { MovieImage } from './movie.image.entity';
import { MovieWriter } from './movie.writer.entity';

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


    @OneToMany(() => MovieCharacter, (movieCharacter : MovieCharacter) => movieCharacter.movie, {
        nullable: true
    })
    @JoinColumn()
    @Field(type => [MovieCharacter], { defaultValue: []})
    public movieCharacter: MovieCharacter[]

    @OneToMany(() => MovieGenre, (movieGenre : MovieGenre) => movieGenre.movie)
    @JoinColumn()
    @Field(type => [MovieGenre], {defaultValue: []})
    public genres: MovieGenre[]

    @OneToMany(() => MovieDirector, (movieDirector : MovieDirector) => movieDirector.movie)
    @JoinColumn()
    @Field(type => [MovieDirector], {defaultValue: []})
    public directors: MovieDirector[]


    @OneToMany(() => MovieWriter, (movieWriter : MovieWriter) => movieWriter.movie)
    @JoinColumn()
    @Field(type => [MovieWriter], {defaultValue: []})
    public writers: MovieWriter[]
}