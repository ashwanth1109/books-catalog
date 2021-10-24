import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { Promise } from 'mongoose';

import { Book, BookModel } from '../entities/book.model';
import { BookInput } from '../types/book.input';
import { ObjectIdScalar } from '../scalars/object-id.scalar';

@Resolver((_: void) => Book)
export class BookResolver {
  @Query((_: void) => Book, { nullable: true })
  async book(
    @Arg('bookId', (_: void) => ObjectIdScalar) bookId: ObjectId
  ): Promise<Book | null> {
    const book = await BookModel.findById(bookId);

    return book;
  }

  @Query((_: void) => [Book])
  async books(): Promise<Book[]> {
    const books = await BookModel.find({});

    return books;
  }

  @Mutation((_: void) => Book)
  async addBook(@Arg('book') bookInput: BookInput): Promise<Book> {
    const book = new BookModel(bookInput);
    await book.save();

    return book;
  }
}
