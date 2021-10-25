import { gql } from "@apollo/client";

export const GET_BOOK_BY_ID = gql`
  query GetBookById($bookId: ObjectId!) {
    book(bookId: $bookId) {
      _id
      title
      description
      year
    }
  }
`;
