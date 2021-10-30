import { gql } from 'apollo-server-core';

export const ADD_BOOK = gql`
  mutation AddBookMutation($book: BookInput!) {
    addBook(book: $book) {
      title
      description
      year
    }
  }
`;
