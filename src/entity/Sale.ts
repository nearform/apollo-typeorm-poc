import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Sale {
  @PrimaryGeneratedColumn({ name: 'sale_id' })
  id!: number

  @Column()
  amount!: number
}
