import { gql } from 'apollo-server-core';

export const GET_BOOKS = gql`
  query GetAllBooks {
    books {
      _id
      title
      description
      year
    }
  }
`;

export const GET_BOOK = gql`
  query GetBookById($bookId: ObjectId!) {
    book(bookId: $bookId) {
      _id
      title
      description
      year
    }
  }
`;
