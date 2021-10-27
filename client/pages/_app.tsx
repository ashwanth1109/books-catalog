import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";

import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import NextNprogress from "nextjs-progressbar";

import MainLayout from "../layout/main.layout";
import { AppContext, initialState } from "../state";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BOOKS_API_URL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={initialState}>
        <MainLayout>
          <NextNprogress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <Component {...pageProps} />
        </MainLayout>
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
