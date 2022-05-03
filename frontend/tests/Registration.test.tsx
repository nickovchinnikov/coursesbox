import { render, screen, act } from "@/test-utils";
import userEvent from "@testing-library/user-event";

import Registration from "@/pages/registration";

describe("Registration page", () => {
  it("Render check", () => {
    const { container } = render(<Registration />);
    expect(container).toMatchSnapshot();
  });
  it("Client validation check", async () => {
    render(<Registration />);

    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    await act(async () => {
      userEvent.click(submitButton);
    });

    expect(screen.getAllByText("Required field!")).toHaveLength(3);

    await act(async () => {
      userEvent.type(
        screen.getByRole("textbox", { name: "username Required field!" }),
        "test"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "email Required field!" }),
        "test"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "password Required field!" }),
        "test"
      );
    });

    expect(screen.getByText("Min length 6!")).toBeInTheDocument();
    expect(screen.getByText("Invalid email!")).toBeInTheDocument();
    expect(screen.getByText("Min length 8!")).toBeInTheDocument();

    await act(async () => {
      userEvent.type(
        screen.getByRole("textbox", { name: "username Min length 6!" }),
        "test--!"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "email Invalid email!" }),
        "test@test"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "password Min length 8!" }),
        "testtest!"
      );
    });

    expect(
      screen.getByText("Only letters, numbers and spaces!")
    ).toBeInTheDocument();

    await act(async () => {
      const usernameInput = screen.getByRole("textbox", {
        name: "username Only letters, numbers and spaces!",
      });
      userEvent.clear(usernameInput);
      userEvent.type(usernameInput, "testtesttest");
    });

    const alerts = screen.getAllByRole("alert");

    expect(alerts).toHaveLength(3);
    expect(alerts[0]).toMatchSnapshot();
    expect(alerts[1]).toMatchSnapshot();
    expect(alerts[2]).toMatchSnapshot();
  });
});
