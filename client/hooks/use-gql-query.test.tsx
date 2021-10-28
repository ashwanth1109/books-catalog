import { act, renderHook } from "@testing-library/react-hooks";
import { ReactNode, useContext } from "react";
import { QueryHookOptions } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { MockedResponse } from "@apollo/client/utilities/testing/mocking/mockLink";

import useGqlQueryHook from "hooks/use-gql-query.hook";
import { GET_ALL_BOOKS, GET_BOOK_BY_ID } from "gql/queries";
import { MapAny } from "../types/util.types";
import { expect } from "@jest/globals";
import { AppContext } from "../state";
import { ReplaySubject } from "rxjs";
import { ClientError, ErrorCode, ErrorType } from "../state/errors.state";
import { GraphQLError } from "graphql";

const BOOK_ID = "1234";

const wrapWithMockProvider = (gqlMocks: ReadonlyArray<MockedResponse>) => {
  return ({ children }: { children: ReactNode }) => (
    <MockedProvider mocks={gqlMocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
};

describe("use-gql-query hook", () => {
  describe("loading state", () => {
    const wrapper = wrapWithMockProvider([
      {
        request: { query: GET_BOOK_BY_ID, variables: { bookId: BOOK_ID } },
      },
    ]);

    it("should assert that loading state is returned when gql is loading", async () => {
      await act(async () => {
        const { result } = renderHook(
          () =>
            useGqlQueryHook(GET_BOOK_BY_ID, {
              bookId: BOOK_ID,
            } as QueryHookOptions<MapAny, MapAny>),
          {
            wrapper,
          }
        );

        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBeUndefined();
      });
    });
  });

  describe("network error", () => {
    const wrapper = wrapWithMockProvider([
      {
        request: { query: GET_BOOK_BY_ID, variables: { bookId: BOOK_ID } },
        error: new Error("Test error"),
      },
    ]);

    it("should assert that network errors are sent to error state", async () => {
      const errorSubject = new ReplaySubject<ClientError>();

      await act(async () => {
        renderHook(
          () => {
            const { errorsState } = useContext(AppContext);
            errorsState.error = errorSubject;
            useGqlQueryHook(GET_BOOK_BY_ID, {
              bookId: BOOK_ID,
            } as QueryHookOptions<MapAny, MapAny>);
          },
          {
            wrapper,
          }
        );

        await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
        await new Promise((resolve) => {
          errorSubject.subscribe((error) => {
            expect(error.type).toBe(ErrorType.GRAPHQL_CLIENT_ERROR);
            expect(error.code).toBe(ErrorCode.NETWORK_ERROR);
            expect(error.message).toMatchSnapshot();
            resolve(void 0);
          });
        });
      });
    });
  });

  describe("graphql errors", () => {
    const testCode = "testCode";
    const testError = "testError";
    const wrapper = wrapWithMockProvider([
      {
        request: { query: GET_ALL_BOOKS },
        result: {
          errors: [
            new GraphQLError(testError, null, null, null, null, null, {
              code: testCode,
            }),
          ],
        },
      },
    ]);

    it("should assert that graphql errors are sent to error state", async () => {
      const errorSubject = new ReplaySubject<ClientError>();

      await act(async () => {
        renderHook(
          () => {
            const { errorsState } = useContext(AppContext);
            errorsState.error = errorSubject;
            useGqlQueryHook(GET_ALL_BOOKS);
          },
          { wrapper }
        );

        await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
        await new Promise((resolve) => {
          errorSubject.subscribe((error) => {
            console.log(error);
            expect(error.type).toBe(ErrorType.GRAPHQL_CLIENT_ERROR);
            expect(error.message).toBe(testError);
            expect(error.code).toBe(testCode);
            resolve(void 0);
          });
        });
      });
    });
  });
});
