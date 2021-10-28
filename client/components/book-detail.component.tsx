import { FunctionComponent, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import CustomBreadcrumb from "components/custom-breadcrumb.component";
import BookDetailCard from "components/book-detail-card.component";
import { GET_BOOK_BY_ID } from "gql/queries";
import useGqlQueryHook from "hooks/use-gql-query.hook";
import { AppContext } from "state";

interface BookDetailProps {
  bookId: string;
}

const BookDetail: FunctionComponent<BookDetailProps> = ({ bookId }) => {
  const router = useRouter();
  const { booksState } = useContext(AppContext);
  const { loading, data } = useGqlQueryHook(GET_BOOK_BY_ID, {
    variables: { bookId },
  });

  useEffect(() => {
    booksState.current.next(data?.book || {});
  }, [booksState, data]);

  return (
    <>
      <div className="mt-4">
        <CustomBreadcrumb
          title={data?.book.title}
          navigate={() => router.push("/")}
        />
      </div>
      <div className="mt-8">
        <BookDetailCard loading={loading} />
      </div>
    </>
  );
};

export default BookDetail;
