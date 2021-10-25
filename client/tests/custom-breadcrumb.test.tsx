import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CustomBreadcrumb from "../components/custom-breadcrumb.component";

const TITLE = "book-title";

describe("custom-breadcrumb.component.tsx", () => {
  it("should assert that no props breadcrumb shows only one level", () => {
    const { container } = render(<CustomBreadcrumb />);
    expect(screen.getByText("Books")).toBeInTheDocument();
    expect(() => {
      screen.getByText(TITLE);
    }).toThrowError();
    expect(container).toMatchSnapshot();
  });

  it("should assert that breadcrumbs has two levels with title", () => {
    const navFn = jest.fn();
    const { container } = render(
      <CustomBreadcrumb navigate={navFn} title={TITLE} />
    );
    expect(screen.getByText("Books")).toBeInTheDocument();
    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(navFn).not.toBeCalled();
    fireEvent.click(screen.getByText("Books"));
    expect(navFn).toBeCalled();
    expect(container).toMatchSnapshot();
  });
});
