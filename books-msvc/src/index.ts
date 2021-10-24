import 'reflect-metadata';
import { Logger, NodeError, PORT } from '@ashwanth1109/books-catalog-common';
import mongoose from 'mongoose';

import initializeServers from './server';

async function main(): Promise<void> {
  const { apolloServer, httpServer, app } = await initializeServers();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api/books/graphql' });

  try {
    await mongoose.connect('mongodb://books-db-svc:27017/books');
    Logger.info(`🚀 Connected to mongodb successfully`);
  } catch (e: NodeError) {
    Logger.error(`Error connecting to mongodb: ${e.message}`);
  }

  httpServer.listen(PORT.BOOKS, () => {
    Logger.info(
      `🚀 Server ready within the k8s cluster at http://localhost:${PORT.BOOKS}${apolloServer.graphqlPath}`
    );

    Logger.info(
      `🚀 Server ready via Ingress at http://localhost${apolloServer.graphqlPath}`
    );
  });
}

(async (): Promise<void> => {
  await main();
})();
