import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Sale } from './entity/Sale'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5438,
  username: 'postgres',
  password: 'postgres',
  synchronize: false,
  logging: false,
  entities: [Sale],
  migrations: [],
  subscribers: []
})
