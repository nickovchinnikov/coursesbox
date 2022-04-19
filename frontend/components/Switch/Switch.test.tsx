import userEvent from "@testing-library/user-event";

import { render, screen } from "@/test-utils";

import { Switch } from "./Switch";

describe("Switch test cases", () => {
  it("Render check", () => {
    const onChange = jest.fn();
    jest.spyOn(Math, "random").mockReturnValue(0.999999999);

    const { asFragment } = render(<Switch onChange={onChange} />);

    expect(asFragment()).toMatchSnapshot();
  });
  it("Check onChange callback", () => {
    const onChange = jest.fn();

    render(<Switch onChange={onChange} />);

    const element = screen.getByTestId("SwitchVisiblePart");

    userEvent.click(element);

    expect(onChange).toHaveBeenCalled();
  });
});
