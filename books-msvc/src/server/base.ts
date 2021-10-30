import { Logger, NodeError, PORT } from '@ashwanth1109/books-catalog-common';
import express, { Express } from 'express';
import http from 'http';
import mongoose from 'mongoose';

import seedDB from '../seed';

class BaseServer {
  public express: Express;
  public http: http.Server;

  public serverUrl: string;

  constructor() {
    this.express = express();
    this.http = http.createServer(this.express);

    this.serverUrl = `http://localhost:${PORT.BOOKS}`;
  }

  public async connectToMongo(): Promise<void> {
    try {
      Logger.info(`Connecting to mongo db`);
      await mongoose.connect(`mongodb://${process.env.DB_URL}`);
      await seedDB();
      Logger.info(`🚀 Connected to mongodb successfully`);
    } catch (e: NodeError) {
      Logger.error(`Error connecting to mongodb: ${e.message}`);
    }
  }

  public async startListening(): Promise<void> {
    Logger.info(`🚀 Server ready at ${this.serverUrl}`);
    await new Promise((resolve) => {
      this.http.listen(PORT.BOOKS, () => resolve(void 0));
    });
  }
}

export default BaseServer;
