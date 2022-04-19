import { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { screen, userEvent } from "@storybook/testing-library";

import { Button } from "./Button";

export default {
  title: "Controls/Button",
  component: Button,
  args: {
    children: "Button",
  },
} as ComponentMeta<typeof Button>;

export const PrimaryButton: ComponentStoryObj<typeof Button> = {
  play: async ({ args }) => {
    await userEvent.click(screen.getByRole("button"));
    // @todo: https://github.com/storybookjs/storybook/issues/16941
    // await expect(args.onClick).toHaveBeenCalled();
  },
  args: {
    color: "primary",
  },
};

export const SecondaryButton: ComponentStoryObj<typeof Button> = {
  ...PrimaryButton,
  args: {
    color: "secondary",
  },
};

export const WarningButton: ComponentStoryObj<typeof Button> = {
  ...PrimaryButton,
  args: {
    color: "warning",
  },
};

export const DangerButton: ComponentStoryObj<typeof Button> = {
  ...PrimaryButton,
  args: {
    color: "danger",
  },
};
