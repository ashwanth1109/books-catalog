import { FunctionComponent } from "react";
import { useRouter } from "next/router";

import CustomBreadcrumb from "./custom-breadcrumb.component";
import BookDetailCard from "./book-detail-card.component";

import { GET_BOOK_BY_ID } from "../gql/queries";
import useGqlQueryHook from "../hooks/use-gql-query.hook";

interface BookDetailProps {
  bookId: string;
}

const BookDetail: FunctionComponent<BookDetailProps> = ({ bookId }) => {
  const router = useRouter();
  const { loading, data } = useGqlQueryHook(GET_BOOK_BY_ID, {
    variables: { bookId },
  });

  return (
    <>
      <div className="mt-4">
        <CustomBreadcrumb
          title={data?.book.title}
          navigate={() => router.push("/")}
        />
      </div>
      <div className="mt-8">
        <BookDetailCard
          loading={loading}
          title={data?.book.title}
          description={data?.book.description}
          year={data?.book.year}
        />
      </div>
    </>
  );
};

export default BookDetail;
