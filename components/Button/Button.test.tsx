import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "./Button";

describe("Button test cases", () => {
  it("Render check", () => {
    const onClick = jest.fn();
    const { asFragment } = render(<Button onClick={onClick}>Button</Button>);

    expect(asFragment()).toMatchSnapshot();
  });
  it("Check onClick callback", () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Button</Button>);

    const element = screen.getByRole("button");

    userEvent.click(element);

    expect(onClick).toHaveBeenCalled();
  });
});
