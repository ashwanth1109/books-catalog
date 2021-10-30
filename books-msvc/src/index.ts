import 'reflect-metadata';

import dotenv from 'dotenv';

import Server, { getSchema } from './server';

dotenv.config();

async function main(): Promise<void> {
  const server = new Server(await getSchema());
  await server.start();
}

(async (): Promise<void> => {
  await main();
})();
