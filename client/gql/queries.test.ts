import { GET_ALL_BOOKS, GET_BOOK_BY_ID } from "gql/queries";

describe("gql.queries unit test", () => {
  describe("GET_BOOK_BY_ID", () => {
    it("should assert that query string is correct", () => {
      expect(GET_BOOK_BY_ID).toMatchSnapshot();
    });
  });

  describe("GET_ALL_BOOKS", () => {
    it("should assert that query string is correct", () => {
      expect(GET_ALL_BOOKS).toMatchSnapshot();
    });
  });
});
