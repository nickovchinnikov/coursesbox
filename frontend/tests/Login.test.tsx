import userEvent from "@testing-library/user-event";

import { Feedback } from "@/components/Input";
import { render, screen, act } from "@/test-utils";

import Login from "@/pages/login";

describe("Login page", () => {
  it("Render check", () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });
  it("Client validation check", async () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await act(async () => {
      userEvent.click(submitButton);
    });

    expect(screen.getAllByText("Required field!")).toHaveLength(2);

    await act(async () => {
      userEvent.type(
        screen.getByRole("textbox", { name: "Identifier Required field!" }),
        "test"
      );
    });

    expect(screen.getByText("Required field!")).toBeInTheDocument();
    expect(screen.getByText("Min length 6!")).toBeInTheDocument();

    await act(async () => {
      userEvent.type(
        screen.getByRole("textbox", { name: "Password Required field!" }),
        "test"
      );
    });

    expect(screen.getByText("Min length 6!")).toBeInTheDocument();
    expect(screen.getByText("Min length 8!")).toBeInTheDocument();

    await act(async () => {
      userEvent.type(
        screen.getByRole("textbox", { name: "Identifier Min length 6!" }),
        "test@test"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Password Min length 8!" }),
        "testtest!"
      );
    });

    const alerts = screen.getAllByRole("alert");

    expect(alerts[0]).toMatchSnapshot();
    expect(alerts[1]).toMatchSnapshot();
  });
});
