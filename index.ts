import 'reflect-metadata'

import { ApolloServer, gql } from 'apollo-server'
import Fastify from 'fastify'
import mercurius from 'mercurius'
import { Pool } from 'pg'

import { typeDefs } from './src/typeDefs'
import { resolvers } from './src/resolvers'
import { AppDataSource } from './src/data-source'

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  port: 5438
})

const apollo = new ApolloServer({
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
  csrfPrevention: true,
  context: {
    pg: pool
  }
})

const fastify = Fastify()
fastify.register(mercurius, {
  schema: typeDefs,
  resolvers,
  context: () => ({
    pg: pool
  }),
  graphiql: true
})

async function run() {
  await AppDataSource.initialize()

  const { url } = await apollo.listen()
  console.log(`🚀  Apollo ready at ${url}`)

  const address = await fastify.listen({ port: 3000 })
  console.log(`🚀  Fastify ready at ${address}`)
}

run()
