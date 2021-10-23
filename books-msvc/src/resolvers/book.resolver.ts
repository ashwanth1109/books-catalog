import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Book, BookModel } from '../entities/book';
import { BookInput } from '../types/book.input';
import { Promise } from 'mongoose';

@Resolver((of: void) => Book)
export class BookResolver {
  @Query((returns: void) => [Book])
  async books(): Promise<Book[]> {
    const books = await BookModel.find({});

    return books;
  }

  @Mutation((returns: void) => Book)
  async addBook(@Arg('book') bookInput: BookInput): Promise<Book> {
    const book = new BookModel(bookInput);
    await book.save();

    return book;
  }
}
