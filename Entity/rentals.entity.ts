import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Rentals{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    book_id: number

    @Column()
    start_date: Date

    @Column()
    end_date: Date
}