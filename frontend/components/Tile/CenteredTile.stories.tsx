import { expect } from "@storybook/jest";
import { screen } from "@storybook/testing-library";
import { ComponentStoryObj, ComponentMeta } from "@storybook/react";

import { CenteredTile } from "./CenteredTile";

export default {
  title: "Content/Tile",
  component: CenteredTile,
} as ComponentMeta<typeof CenteredTile>;

export const CenteredTileExample: ComponentStoryObj<typeof CenteredTile> = {
  play: async () => {
    await expect(screen.getByRole("heading")).toBeInTheDocument();
  },
  args: {
    header: "Lorem ipsum dolor sit amet",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
};
