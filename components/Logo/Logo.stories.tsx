import { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { screen } from "@storybook/testing-library";

import { Logo } from "./Logo";

export default {
  title: "Content/Logo",
  component: Logo,
} as ComponentMeta<typeof Logo>;

export const BasicLogo: ComponentStoryObj<typeof Logo> = {
  play: async () => {
    await expect(screen.getByRole("banner")).toBeInTheDocument();
  },
  args: {
    children: "CoursesBox",
  },
};
