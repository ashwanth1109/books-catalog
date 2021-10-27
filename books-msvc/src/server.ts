import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ObjectId } from 'mongodb';
import { buildSchema } from 'type-graphql';
import express, { Express } from 'express';
import http from 'http';
import path from 'path';

import { BookResolver } from './resolvers/book.resolver';
import { ObjectIdScalar } from './scalars/object-id.scalar';
import { TypeGooseMiddleware } from './middlewares/type-goose.middleware';

interface Servers {
  app: Express;
  httpServer: http.Server;
  apolloServer: ApolloServer<ExpressContext>;
}

const initializeServers = async (): Promise<Servers> => {
  const app = express();

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [BookResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    globalMiddlewares: [TypeGooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  return { app, httpServer, apolloServer };
};

export default initializeServers;
