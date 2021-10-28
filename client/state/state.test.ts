import State, { initialState } from "state";
import BooksState from "state/books.state";
import ErrorsState from "state/errors.state";
import { expect } from "@jest/globals";

describe("state object", () => {
  it("should assert that class instance types are correct", () => {
    expect(initialState).toBeInstanceOf(State);
    expect(initialState.booksState).toBeInstanceOf(BooksState);
    expect(initialState.errorsState).toBeInstanceOf(ErrorsState);
  });

  it("should assert that subscriptions fire when state is updated", async () => {
    const books = jest.fn();
    initialState.booksState.all.next(books as any);
    expect(initialState.booksState.all.getValue()).toBe(books);

    const book = jest.fn();
    initialState.booksState.current.next(book as any);
    expect(initialState.booksState.current.getValue()).toBe(book);

    const error = jest.fn();
    initialState.errorsState.error.next(error as any);
    await new Promise((resolve) => {
      initialState.errorsState.error.subscribe((val) => {
        expect(val).toBe(error);
        resolve(void 0);
      });
    });
  });
});
