import { useRouter } from "next/router";

import { pageRender as render, screen, waitFor } from "@/test-utils";
import { mockUser } from "@/mocks/user";
import User from "@/pages/user";

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn().mockReturnValue({
    query: {},
    push: jest.fn(),
  }),
}));

const preloadedState = {
  user: {
    jwt: mockUser.jwt,
    email: mockUser.user.email,
    username: mockUser.user.username,
  },
};

describe("User page", () => {
  it("Render check", async () => {
    const { container } = render(<User />, {
      preloadedState,
    });
    expect(container).toMatchSnapshot();
  });
  it("Load user", async () => {
    const { container } = render(<User />, {
      preloadedState,
    });

    await screen.findByText("Profile");

    expect(
      screen.getByText(`username: ${mockUser.user.username}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`email: ${mockUser.user.email}`)
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
  it("Redirect to login page", async () => {
    // Mock the router
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push,
    });

    render(<User />, {
      preloadedState: {
        user: {
          jwt: "",
          email: "",
          username: "",
        },
      },
    });

    await waitFor(() => expect(push).toHaveBeenCalledWith("/login"));
  });
});
