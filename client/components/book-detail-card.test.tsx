import { render } from "@testing-library/react";

import BookDetailCard from "components/book-detail-card.component";

describe("book-detail-card.component.tsx", () => {
  it("should assert that dom snapshot is correct", () => {
    const { container } = render(<BookDetailCard loading={true} />);

    expect(container).toMatchSnapshot();
  });
});
