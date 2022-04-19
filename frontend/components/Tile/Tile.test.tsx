import { render } from "@/test-utils";

import { Tile } from "./Tile";

describe("Tile test cases", () => {
  it("Tile render check", () => {
    const { asFragment } = render(
      <Tile header="Lorem ipsum dolor sit amet">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris
      </Tile>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
