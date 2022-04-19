import { expect } from "@storybook/jest";
import { screen } from "@storybook/testing-library";
import { ComponentStoryObj, ComponentMeta } from "@storybook/react";

import { Course } from "./Course";

export default {
  title: "Content/Course",
  component: Course,
} as ComponentMeta<typeof Course>;

export const BasicCourse: ComponentStoryObj<typeof Course> = {
  play: async () => {
    await expect(screen.getByRole("heading")).toBeInTheDocument();
    await expect(screen.getByRole("img")).toBeInTheDocument();
    await expect(screen.getByRole("link")).toBeInTheDocument();
  },
  args: {
    header: "Hands-On React. Build advanced React JS Frontend with expert",
    link: "/hands-on-reactjs",
    imageProps: {
      width: 1368,
      height: 770,
      alt: "Logo for Hands-On React. Build advanced React JS Frontend with expert",
      src: "/covers/hands-on_reactjs_cover.png",
    },
    children: (
      <>
        React is the most popular library for building frontend web
        applications. Step-by-step by diving into all the basics, I&apos;ll
        introduce you to advanced concepts as well. We&apos;ll build the
        minesweeper application from scratch We&apos;ll build the minesweeper
        application from scratch:
        <ul>
          <li>setup of the development environment</li>
          <li>configuration of the React JS app</li>
          <li>basic algorithms of Minesweeper</li>
        </ul>
      </>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
  },
};
