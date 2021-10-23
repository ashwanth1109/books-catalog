import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import * as path from 'path';
import { BookResolver } from './resolvers/book.resolver';
import { Logger, NodeError, PORT } from '@ashwanth1109/books-catalog-common';
import { ObjectId } from 'mongodb';
import { ObjectIdScalar } from './scalars/object-id.scalar';
import { TypeGooseMiddleware } from './middlewares/type-goose.middleware';
import { buildSchema } from 'type-graphql';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

async function main(): Promise<void> {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [BookResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    globalMiddlewares: [TypeGooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app, path: '/api/books/graphql' });
  await new Promise((resolve) => {
    httpServer.listen({ port: PORT.BOOKS }, resolve);
  });

  try {
    await mongoose.connect('mongodb://books-db-svc:27017/books');
    Logger.info(`Connected to mongodb successfully`);
  } catch (e: NodeError) {
    Logger.error(`Error connecting to mongodb: ${e.message}`);
  }

  Logger.info(
    `🚀 Server ready at http://localhost:${PORT.BOOKS}${server.graphqlPath}`
  );
}

(async (): Promise<void> => {
  await main();
})();
