import { useRouter } from "next/router";

import { pageRender as render, screen, act, waitFor } from "@/test-utils";
import userEvent from "@testing-library/user-event";

import Registration from "@/pages/registration";

import { mockUser } from "@/mocks/user";

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn(),
}));

describe("Registration page", () => {
  it("Render check", () => {
    const { container } = render(<Registration />);
    expect(container).toMatchSnapshot();
  });
  it("Client validation check", async () => {
    render(<Registration />);

    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    userEvent.type(screen.getByRole("textbox", { name: "username" }), "test");
    userEvent.type(screen.getByRole("textbox", { name: "email" }), "test");
    userEvent.type(screen.getByLabelText("password"), "test");

    await act(async () => {
      userEvent.click(submitButton);
    });

    expect(
      screen.getByText("Letters and digits, min 6 symbols!")
    ).toBeInTheDocument();
    expect(screen.getByText("Should be valid email!")).toBeInTheDocument();
    expect(screen.getByText("Min length 6 symbols!")).toBeInTheDocument();
  });
  it("Server validation check", async () => {
    render(<Registration />);

    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    userEvent.type(
      screen.getByRole("textbox", { name: "username" }),
      "testtest"
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "email" }),
      "test@test.test"
    );
    userEvent.type(screen.getByLabelText("password"), "testtest!");

    await act(async () => {
      userEvent.click(submitButton);
    });

    expect(
      await screen.findByText("An error occurred during account creation")
    ).toBeInTheDocument();
  });
  it("Successful registration check", async () => {
    // Mock the router
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<Registration />);

    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    userEvent.type(
      screen.getByRole("textbox", { name: "username" }),
      mockUser.user.username
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "email" }),
      mockUser.user.email
    );
    userEvent.type(screen.getByLabelText("password"), mockUser.user.password);

    act(() => {
      userEvent.click(submitButton);
    });

    // Check if the user is redirected to the user page
    await waitFor(() => expect(push).toHaveBeenCalledWith("/user"));
  });
});
