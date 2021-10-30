import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ObjectId } from 'mongodb';
import { PORT } from '@ashwanth1109/books-catalog-common';
import { buildSchema } from 'type-graphql';
import path from 'path';

import { BookResolver } from '../resolvers/book.resolver';
import { GraphQLSchema } from 'graphql';
import { ObjectIdScalar } from '../scalars/object-id.scalar';
import { TypeGooseMiddleware } from '../middlewares/type-goose.middleware';
import BaseServer from './base';

export const getSchema = (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers: [BookResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    globalMiddlewares: [TypeGooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });
};

class Server extends BaseServer {
  public apollo: ApolloServer;
  public apiPath = '/api/books/graphql';
  public static schema: GraphQLSchema;

  constructor(schema: GraphQLSchema) {
    super();
    this.apollo = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer: this.http })],
    });
  }

  public async start(): Promise<void> {
    this.serverUrl = `http://localhost:${PORT.BOOKS}${this.apiPath}`;
    await this.apollo.start();
    this.apollo.applyMiddleware({
      app: this.express,
      path: this.apiPath,
      cors: {
        origin: [
          'http://localhost:4000', // Local React App
          'https://studio.apollographql.com', // GraphQL explorer
        ],
      },
    });

    await this.connectToMongo();
    await this.startListening();
  }
}

export default Server;
