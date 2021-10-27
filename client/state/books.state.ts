import { BehaviorSubject } from "rxjs";

export interface BookListItem {
  _id: string;
  title: string;
}

export interface Book extends BookListItem {
  description: string;
  year: number;
}

class BooksState {
  public all: BehaviorSubject<BookListItem[]> = new BehaviorSubject<
    BookListItem[]
  >([]);
  public current: BehaviorSubject<Book | null> =
    new BehaviorSubject<Book | null>(null);
}

export default BooksState;
