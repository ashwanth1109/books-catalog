import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer;

// Before all tests, create mongo server and initialize connection to db
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

// Before each test, clean the database
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  const promises = [];
  for (const collection of collections) {
    promises.push(collection.deleteMany({}));
  }

  await Promise.all(promises);
});

// After all tests, stop mongo server and close db connection
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
