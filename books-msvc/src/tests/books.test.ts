import { ApolloServer } from 'apollo-server-express';
import { GraphQLResponse } from 'apollo-server-types';

import { ADD_BOOK } from './gql/books.mutations';
import { BookInput } from '../types/book.input';
import { GET_BOOK, GET_BOOKS } from './gql/books.queries';
import initializeServers from '../server';

describe('Books microservices test', () => {
  let apolloServer: ApolloServer;

  beforeAll(async () => {
    ({ apolloServer } = await initializeServers());
  });

  const fetchAllBooks = (): Promise<GraphQLResponse> => {
    return apolloServer.executeOperation({
      query: GET_BOOKS,
    });
  };

  const addBook = (book: BookInput): Promise<GraphQLResponse> => {
    return apolloServer.executeOperation({
      query: ADD_BOOK,
      variables: { book },
    });
  };

  const getBookById = (bookId: string): Promise<GraphQLResponse> => {
    return apolloServer.executeOperation({
      query: GET_BOOK,
      variables: { bookId },
    });
  };

  it('should assert that list of books is initially empty', async () => {
    const result = await fetchAllBooks();
    expect(result.errors).toBeUndefined();
    expect(result.data?.books).toEqual([]);
  });

  it('should assert that book can be successfully created', async () => {
    const book: BookInput = {
      title: "Harry Potter and the Philosopher's Stone",
      description: 'How do you not know Harry Potter? What are you, a muggle?',
      year: 1997,
    };

    let result = await addBook(book);
    expect(result.errors).toBeUndefined();
    expect(result).toMatchSnapshot();

    result = await fetchAllBooks();
    expect(result.errors).toBeUndefined();
    // We cannot assert auto generated id
    expect(result.data?.books[0]).toMatchObject(book);
  });

  it('should assert that book details can be fetched using id', async () => {
    const book: BookInput = {
      title: 'Outliers: The Story of Success',
      description: `In this stunning new book, Malcolm Gladwell takes us on an intellectual journey through the world of "outliers"--the best and the brightest, the most famous and the most successful. He asks the question: what makes high-achievers different?`,
      year: 1997,
    };

    let result = await addBook(book);
    expect(result.errors).toBeUndefined();

    result = await fetchAllBooks();
    expect(result.errors).toBeUndefined();

    const bookId = result.data?.books[0]._id;
    result = await getBookById(bookId);
    expect(result.errors).toBeUndefined();
    expect(result.data?.book).toEqual({ _id: bookId, ...book });
  });

  it('failing test', () => {
    expect(true).toBeFalsy();
  });
});
