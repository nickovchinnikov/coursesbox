import { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { screen, userEvent } from "@storybook/testing-library";

import { Input } from "./Input";
import { Feedback } from "./Feedback";

export default {
  title: "Controls/Input",
  component: Input,
  args: {
    placeholder: "Your name",
    label: "Name:",
  },
} as ComponentMeta<typeof Input>;

export const PrimaryInput: ComponentStoryObj<typeof Input> = {
  play: async ({ args }) => {
    await userEvent.type(screen.getByRole("textbox"), "String");
    await expect(args.onChange).toHaveBeenCalledTimes(6);
  },
  args: {
    feedback: "Looks cool!",
  },
};

export const WithIcon: ComponentStoryObj<typeof Input> = {
  args: {
    icon: "Search",
  },
};

export const WithValidFeedback: ComponentStoryObj<typeof Input> = {
  args: {
    feedback: <Feedback isValid={true}>Looks good!</Feedback>,
  },
  argTypes: {
    feedback: {
      control: false,
    },
  },
};

export const WithInvalidFeedback: ComponentStoryObj<typeof Input> = {
  args: {
    feedback: <Feedback isValid={false}>Required!</Feedback>,
  },
  argTypes: {
    feedback: {
      control: false,
    },
  },
};
