import { render, screen, act } from "@/test-utils";
import userEvent from "@testing-library/user-event";

import { Layout } from "./Layout";

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn().mockReturnValue({
    query: {},
    push: jest.fn(),
  }),
}));

describe("Layout test cases", () => {
  const child = (
    <>
      <h1>Main article area</h1>
      <p>
        In this layout, we display the areas in source order for any screen less
        that 500 pixels wide. We go to a two column layout, and then to a three
        column layout by redefining the grid, and the placement of items on the
        grid.
      </p>
    </>
  );

  it("Render check", () => {
    const { asFragment } = render(<Layout>{child}</Layout>);

    expect(asFragment()).toMatchSnapshot();
  });
  it("Theme toggle check", async () => {
    localStorage.setItem("theme", "light");
    (window.matchMedia as jest.Mock).mockReturnValue({ matches: true });

    render(<Layout>{child}</Layout>);

    const themeToggler = screen.getByRole("button", { name: "Moon" });
    expect(themeToggler).toBeInTheDocument();

    await act(async () => {
      userEvent.click(themeToggler);
    });

    expect(localStorage.getItem("theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Sun" })).toBeInTheDocument();
  });
});
