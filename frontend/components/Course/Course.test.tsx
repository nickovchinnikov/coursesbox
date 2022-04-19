import { render } from "@/test-utils";

import { Course } from "./Course";

describe("Course test cases", () => {
  it("Course render check", () => {
    const { asFragment } = render(
      <Course
        header="Hands-On React. Build advanced React JS Frontend with expert"
        link="/hands-on-reactjs"
        imageProps={{
          width: 1368,
          height: 770,
          alt: "Logo for Hands-On React",
          src: "/hands-on_reactjs_cover.png",
        }}
      >
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
      </Course>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
