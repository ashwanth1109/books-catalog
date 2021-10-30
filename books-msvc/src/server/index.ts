import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ObjectId } from 'mongodb';
import { PORT } from '@ashwanth1109/books-catalog-common';
import { buildSchema } from 'type-graphql';
import path from 'path';

import { BookResolver } from '../resolvers/book.resolver';
import { ObjectIdScalar } from '../scalars/object-id.scalar';
import { TypeGooseMiddleware } from '../middlewares/type-goose.middleware';
import BaseServer from './base';

class Server extends BaseServer {
  public apollo?: ApolloServer;

  public async initializeApollo(): Promise<void> {
    this.apollo = new ApolloServer({
      schema: await buildSchema({
        resolvers: [BookResolver],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
        globalMiddlewares: [TypeGooseMiddleware],
        scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
        validate: false,
      }),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer: this.http })],
    });
  }

  public async startApollo(): Promise<void> {
    await this.initializeApollo();
    const apiPath = '/api/books/graphql';
    this.serverUrl = `http://localhost:${PORT.BOOKS}${apiPath}`;
    await this.apollo?.start();
    this.apollo?.applyMiddleware({
      app: this.express,
      path: apiPath,
      cors: {
        origin: [
          'http://localhost:4000', // Local React App
          'https://studio.apollographql.com', // GraphQL explorer
        ],
      },
    });
  }
}

export default Server;
