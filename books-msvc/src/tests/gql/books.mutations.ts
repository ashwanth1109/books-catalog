export const ADD_BOOK = `
    mutation AddBookMutation($book: BookInput!) {
      addBook(book: $book) {
        title,
        description,
        year
      }
    }
`;
