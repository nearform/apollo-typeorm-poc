import { AppDataSource } from './data-source'
import { Sale } from './entity/Sale'

export const resolvers = {
  Query: {
    salesTypeOrm: async (parent: any, args: any, context: any) => {
      return AppDataSource.manager.find(Sale)
    },
    salesPg: async (parent: any, args: any, context: any) => {
      const { rows } = await context.pg.query(`
      SELECT 
        sale_id as id,
        amount,
        date_sale as date,
        product_id as productId,
        user_id as userId,
        store_id as storeId
        FROM sale
  `)
      return rows
    }
  }
}
