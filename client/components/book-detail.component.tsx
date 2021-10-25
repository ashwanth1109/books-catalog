import { useQuery } from "@apollo/client";
import CustomBreadcrumb from "./custom-breadcrumb.component";
import BookDetailCard from "./book-detail-card.component";
import { GET_BOOK_BY_ID } from "../gql/queries";

const BookDetailComponent = ({
  bid,
  navigateToBooks,
}: {
  bid: string;
  navigateToBooks: () => void;
}) => {
  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { bookId: bid },
  });

  if (error) return <h1>Error fetching data...</h1>;

  return (
    <>
      <div className="mt-4">
        <CustomBreadcrumb title={data?.book.title} navigate={navigateToBooks} />
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

export default BookDetailComponent;
