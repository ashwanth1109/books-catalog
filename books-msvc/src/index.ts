import 'reflect-metadata';

import { Logger, PORT } from '@ashwanth1109/books-catalog-common';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import type { NodeError } from '@ashwanth1109/books-catalog-common';

import initializeServers from './server';
import seedDB from './seed';

dotenv.config();

async function main(): Promise<void> {
  const { apolloServer, httpServer, app } = await initializeServers();
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    path: '/api/books/graphql',
    cors: {
      origin: [
        'http://localhost:4000', // Local React App
        'https://studio.apollographql.com', // GraphQL explorer
      ],
    },
  });

  try {
    Logger.info(`Connecting to mongo db`);
    await mongoose.connect(`mongodb://${process.env.DB_URL}`);
    await seedDB();
    Logger.info(`🚀 Connected to mongodb successfully`);
  } catch (e: NodeError) {
    Logger.error(`Error connecting to mongodb: ${e.message}`);
  }

  httpServer.listen(PORT.BOOKS, () => {
    Logger.info(
      `🚀 Server ready at http://localhost:${PORT.BOOKS}${apolloServer.graphqlPath}`
    );
  });
}

(async (): Promise<void> => {
  await main();
})();
