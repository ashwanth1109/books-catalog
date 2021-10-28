import { render } from "@testing-library/react";
import Loading from "./loading.component";

describe("loading.component.tsx", () => {
  it("should assert that dom snapshot is correct", () => {
    const { container } = render(<Loading />);

    expect(container).toMatchSnapshot();
  });
});
