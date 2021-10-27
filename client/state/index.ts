import { createContext } from "react";

import BooksState from "./books.state";
import ErrorsState from "./errors.state";

// Keeping state as a class instance =>
// this allows for maintaining more than one instance of state in the application (if necessary)
class State {
  public booksState: BooksState;
  public errorsState: ErrorsState;

  constructor() {
    this.booksState = new BooksState();
    this.errorsState = new ErrorsState();
  }
}

export default State;

export const initialState = new State();
export const AppContext = createContext<State>(initialState);
