import { Logger } from '@ashwanth1109/books-catalog-common';
import type { NodeError } from '@ashwanth1109/books-catalog-common';

import { Book, BookModel } from '../models/book.model';
import booksData from './books.data';

const seedDB = async (): Promise<void> => {
  try {
    const books: Book[] = await BookModel.find({});

    if (books.length === 0) {
      Logger.info(`No books found in db. Seeding db`);
      for (const bookInput of booksData) {
        const book = new BookModel(bookInput);
        books.push(book);
      }

      await BookModel.insertMany(books);
    } else {
      Logger.info(`${books.length} books already in db. Skipping seed.`);
    }
  } catch (e: NodeError) {
    Logger.error(`Error seeding data::: ${e.message}`);
  }
};

export default seedDB;
