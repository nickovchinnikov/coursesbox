import { useRouter } from "next/router";

import { pageRender as render, screen, act, waitFor } from "@/test-utils";
import userEvent from "@testing-library/user-event";

import Login from "@/pages/login";

import { mockUser } from "@/mocks/user";

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn(),
}));

describe("Login page", () => {
  it("Render check", () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });
  it("Client validation check", async () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: "Sign In" });

    userEvent.type(screen.getByRole("textbox", { name: "Identifier" }), "test");
    userEvent.type(screen.getByLabelText("password"), "test");

    await act(async () => {
      userEvent.click(submitButton);
    });

    expect(screen.getByText("Min length 6!")).toBeInTheDocument();
    expect(screen.getByText("Min length 8!")).toBeInTheDocument();
  });
  it("Server validation check", async () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: "Sign In" });

    userEvent.type(
      screen.getByRole("textbox", { name: "Identifier" }),
      "test@test.test"
    );
    userEvent.type(screen.getByLabelText("password"), "testpassworddd!");

    await act(async () => {
      userEvent.click(submitButton);
    });

    expect(
      await screen.findByText("Invalid identifier or password")
    ).toBeInTheDocument();
  });
  it("Successful login check", async () => {
    // Mock the router
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<Login />);

    const submitButton = screen.getByRole("button", { name: "Sign In" });

    userEvent.type(
      screen.getByRole("textbox", { name: "Identifier" }),
      mockUser.user.email
    );

    userEvent.type(screen.getByLabelText("password"), mockUser.user.password);

    await act(async () => {
      userEvent.click(submitButton);
    });

    // Check if the user is redirected to the user page
    await waitFor(() => expect(push).toHaveBeenCalledWith("/user"));
  });
});
