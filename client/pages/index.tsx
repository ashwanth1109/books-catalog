import { Card } from "antd";
import { useContext, useEffect } from "react";

import type { NextPage } from "next";

import CustomBreadcrumb from "../components/custom-breadcrumb.component";
import BookList from "../components/book-list.component";
import useGqlQueryHook from "../hooks/use-gql-query.hook";
import { AppContext } from "../state";
import { GET_ALL_BOOKS } from "../gql/queries";

/**
 * FIXME: Initial hydration of data should happen on server side in "getInitialProps" to take advantage of SSR
 * However, the challenge is requests made from server do not get forwarded to ingress from within the cluster.
 * We need to setup networking for enabling inter-cluster communication
 * Options: Containers in the same pod? Sidecar pods?
 */

const Home: NextPage = () => {
  const { loading, data } = useGqlQueryHook(GET_ALL_BOOKS);
  const { booksState } = useContext(AppContext);

  useEffect(() => {
    booksState.all.next(data?.books || []);
  }, [booksState, data]);

  return (
    <>
      <CustomBreadcrumb />
      <Card
        title="List of books in your catalog:"
        className="p-8"
        loading={loading}
      >
        <BookList />
      </Card>
    </>
  );
};

export default Home;
