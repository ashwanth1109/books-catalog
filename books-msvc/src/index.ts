import 'reflect-metadata';

import dotenv from 'dotenv';

import Server from './server';

dotenv.config();

async function main(): Promise<void> {
  const server = new Server();
  await server.startApollo();
  await server.connectToMongo();
  await server.startListening();
}

(async (): Promise<void> => {
  await main();
})();
