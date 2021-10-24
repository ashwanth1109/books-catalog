import type { NextPage } from "next";
import { Breadcrumb } from "antd";

import MainLayout from "../layout/main.layout";
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
  const { loading, error, data } = useQuery(
    gql`
      query {
        books {
          _id
          title
        }
      }
    `
  );

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;

  return (
    <MainLayout>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Books</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-8">
        {(data?.books || [])?.map((book: Book) => (
          <div key={book._id}>{book?.title}</div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Home;
