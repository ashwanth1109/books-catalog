import { render, screen, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import BookDetailComponent from "../components/book-detail.component";
import { GET_BOOK_BY_ID } from "../gql/queries";

const BOOK_ID = "1234";
const BOOK_TITLE = "BOOK_TITLE";
const BOOK_DESCRIPTION = "BOOK_DESCRIPTION";
const BOOK_YEAR = "BOOK_YEAR";
const gqlMocks: any[] = [
  {
    request: { query: GET_BOOK_BY_ID, variables: { bookId: BOOK_ID } },
    result: {
      data: {
        book: {
          _id: BOOK_ID,
          title: BOOK_TITLE,
          description: BOOK_DESCRIPTION,
          year: BOOK_YEAR,
        },
      },
    },
  },
];

describe("book-detail.component.tsx", () => {
  it("should assert that gql data is rendered correctly", async () => {
    await act(async () => {
      const { container } = render(
        <MockedProvider mocks={gqlMocks} addTypename={false}>
          <BookDetailComponent bookId={BOOK_ID} />
        </MockedProvider>
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(screen.getAllByText(BOOK_TITLE).length).toBe(2);
      expect(screen.getAllByText(BOOK_DESCRIPTION).length).toBe(1);
      expect(screen.getAllByText(`Year: ${BOOK_YEAR}`).length).toBe(1);

      expect(container).toMatchSnapshot();
    });
  });
});
