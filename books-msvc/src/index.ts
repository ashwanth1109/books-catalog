import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import { Logger } from '@ashwanth1109/books-catalog-common';
import { Query, Resolver, buildSchema } from 'type-graphql';
import express from 'express';
import http from 'http';

@Resolver()
class HelloResolver {
  @Query(() => String, { nullable: true, description: '' })
  hello(): string {
    return 'Hello World!';
  }
}

async function main(): Promise<void> {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => {
    httpServer.listen({ port: 4000 }, resolve);
  });
  Logger.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

(async (): Promise<void> => {
  await main();
})();
