import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";

import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "/api/books/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
