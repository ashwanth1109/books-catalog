import { act, render } from "@testing-library/react";
import MainLayout from "./main.layout";

describe("main.layout.tsx", () => {
  it("should assert that main layout snapshot is correct", async () => {
    await act(async () => {
      const { container } = render(<MainLayout />);

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(container).toMatchSnapshot();
    });
  });
});
