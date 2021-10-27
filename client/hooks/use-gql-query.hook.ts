import { useContext } from "react";
import { AppContext } from "../state";
import {
  DocumentNode,
  QueryHookOptions,
  TypedDocumentNode,
  useQuery,
} from "@apollo/client";

interface MapAny {
  [key: string]: any;
}

const useGqlQueryHook = (
  query: DocumentNode | TypedDocumentNode,
  variables?: QueryHookOptions<MapAny, MapAny>
) => {
  const { errorsState } = useContext(AppContext);
  const errorType = "GRAPHQL_CLIENT_ERROR";

  const { loading, error, data } = useQuery(query, variables);
  if (error) {
    if (error.graphQLErrors.length > 0) {
      error.graphQLErrors.forEach((errorItem) => {
        errorsState.error.next({
          message: errorItem.message,
          type: errorType,
          code: errorItem.extensions?.["code"],
        });
      });
    }

    if (error.networkError) {
      errorsState.error.next({
        message: error.networkError?.message,
        type: errorType,
        code: "NETWORK_ERROR",
      });
    }

    if (error.clientErrors.length > 0) {
      error.clientErrors.forEach((errorItem) => {
        errorsState.error.next({
          message: errorItem?.message,
          type: errorType,
          code: "CLIENT_ERROR",
        });
      });
    }
  }

  return { loading, data };
};
export default useGqlQueryHook;
