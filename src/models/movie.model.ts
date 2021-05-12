import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, OneToMany, JoinColumn } from 'typeorm';
import { MovieImage } from './movie.image.model';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', default: false })
    name: string;

    @Column({ type: 'timestamptz', default: false })
    releasedDate: Date;

    @Column({ type: 'text', default: false })
    description: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => MovieImage, (movieImage : MovieImage) => movieImage.Movie)
    @JoinColumn()
    public Images: MovieImage[]

}