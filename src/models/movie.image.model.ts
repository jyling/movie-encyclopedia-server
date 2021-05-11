import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';

@Entity()
export class MovieImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', default: false })
    image_url: string;


}