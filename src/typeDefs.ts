export const typeDefs = `
  type Sale {
    id: String!
    amount: Float!
    date: String
    productId: Int
    userId: Int
    storeId: Int
  }

  type Query {
    salesTypeOrm: [Sale]
    salesPg: [Sale]
  }
`
