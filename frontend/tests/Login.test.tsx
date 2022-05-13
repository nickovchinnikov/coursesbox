import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";

import { pageRender as render, screen, act, waitFor } from "@/test-utils";

import { mockUser } from "@/mocks/user";

import Login from "@/pages/login";

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn().mockReturnValue({
    query: {},
    push: jest.fn(),
  }),
}));

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

    expect(alerts).toHaveLength(3);
    expect(alerts[0]).toMatchSnapshot();
    expect(alerts[1]).toMatchSnapshot();
    expect(alerts[2]).toMatchSnapshot();
  });
  it("Server validation error check", async () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: "Sign In" });

    act(() => {
      userEvent.type(
        screen.getByRole("textbox", { name: "Identifier" }),
        "test@test.test"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Password" }),
        "testpassworddd!"
      );
      userEvent.click(submitButton);
    });

    expect(
      await screen.findByText("Invalid identifier or password")
    ).toBeInTheDocument();
  });
  it("Successful login check", async () => {
    // Mock the router
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push,
    });

    render(<Login />);

    const submitButton = screen.getByRole("button", { name: "Sign In" });

    act(() => {
      userEvent.type(
        screen.getByRole("textbox", { name: "Identifier" }),
        mockUser.user.email
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Password" }),
        mockUser.user.password
      );
      userEvent.click(submitButton);
    });

    // Check if the user is redirected to the user page
    await waitFor(() => expect(push).toHaveBeenCalledWith("/user"));
  });
});
