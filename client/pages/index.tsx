import { Breadcrumb, Card } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

interface Book {
  _id: string;
  title: string;
}

/**
 * FIXME: Initial hydration of data should happen on server side in "getInitialProps" to take advantage of SSR
 * However, the challenge is requests made from server do not get forwarded to ingress from within the cluster.
 * We need to setup networking for enabling inter-cluster communication
 * Options: Containers in the same pod? Sidecar pods?
 */

const Home: NextPage = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(
    gql`
      query GetAllBooks {
        books {
          _id
          title
        }
      }
    `
  );

  if (error) return <h1>Error fetching data...</h1>;

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Books</Breadcrumb.Item>
      </Breadcrumb>
      <Card
        title="List of books in your catalog:"
        className="p-8"
        loading={loading}
      >
        {(data?.books || [])?.map((book: Book) => (
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
      </Card>
    </>
  );
};

export default Home;
