import { FunctionComponent, useContext, useEffect, useState } from "react";
import { BookListItem } from "../state/books.state";
import { AppContext } from "../state";
import { Card } from "antd";
import { useRouter } from "next/router";

const BookList: FunctionComponent = () => {
  const [booksList, setBooksList] = useState<BookListItem[]>([]);
  const { booksState } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    const booksSubscription = booksState.all.subscribe((list) => {
      setBooksList(list);
    });

    return () => booksSubscription.unsubscribe();
  }, [booksState]);

  return (
    <>
      {(booksList || [])?.map((book: BookListItem) => (
        <div
          onClick={() => router.push(`/book/${encodeURIComponent(book._id)}`)}
          key={book._id}
        >
          <Card.Grid
            style={{
              width: "25%",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            {book?.title}
          </Card.Grid>
        </div>
      ))}
    </>
  );
};

export default BookList;
