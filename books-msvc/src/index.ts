import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

import express from "express";
import http from "http";
import { buildSchema, Query, Resolver } from "type-graphql";
import { Logger, PORT } from "@ashwanth1109/books-catalog-common";

@Resolver()
class HelloResolver {
  @Query(() => String, { nullable: true, description: "" })
  async hello() {
    return "Hello World!";
  }
}

async function main() {
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
  server.applyMiddleware({ app, path: "/api/books/graphql" });
  await new Promise((resolve) => {
    httpServer.listen({ port: PORT.BOOKS }, resolve);
  });
  Logger.info(
    `🚀 Server ready at http://localhost:${PORT.BOOKS}${server.graphqlPath}`
  );
}

main().then();
