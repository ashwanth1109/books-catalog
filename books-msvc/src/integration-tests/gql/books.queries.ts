export const GET_BOOKS = `
    query GetAllBooks {
        books {
            _id
            title
            description
            year
        }
    }
`;

export const GET_BOOK = `
    query GetBookById($bookId: ObjectId!) {
        book(bookId: $bookId) {
            _id
            title
            description
            year
        }
    }
`;
