import { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { screen } from "@storybook/testing-library";

import { Feedback } from "./Feedback";

export default {
  title: "Controls/Feedback",
  component: Feedback,
} as ComponentMeta<typeof Feedback>;

export const ValidFeedback: ComponentStoryObj<typeof Feedback> = {
  play: async () => {
    await expect(screen.getByText("Looks good!")).toBeInTheDocument();
  },
};
ValidFeedback.args = {
  children: "Looks good!",
  isValid: true,
};

export const InvalidFeedback: ComponentStoryObj<typeof Feedback> = {
  play: async () => {
    await expect(
      screen.getByText("Please provide a valid value")
    ).toBeInTheDocument();
  },
};
InvalidFeedback.args = {
  children: "Please provide a valid value",
  isValid: false,
};
