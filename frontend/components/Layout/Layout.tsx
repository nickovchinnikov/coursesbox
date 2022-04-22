import { FC } from "react";
import Link from "next/link";

import { IconButton } from "@/components/IconButton";
import { StyledLink } from "@/components/StyledLink";

import {
  Wrapper,
  LogoLink,
  StyledLogo,
  MainNav,
  SearchInput,
  Content,
  Footer,
} from "./components";

type Props = {
  isDark: boolean;
  onThemeToggle: () => void;
};

export const Layout: FC<Props> = ({ children, isDark, onThemeToggle }) => {
  const jwt = "";

  return (
    <Wrapper>
      <Link href="/" passHref>
        <LogoLink>
          <StyledLogo size={3}>
            <span className="logo_short">C8X</span>
            <span className="logo_full">CoursesBox</span>
          </StyledLogo>
        </LogoLink>
      </Link>
      <MainNav>
        <Link href="/all" passHref>
          <StyledLink>All</StyledLink>
        </Link>
        <Link href={jwt ? "/user" : "/login"} passHref>
          <IconButton name={jwt ? "User" : "Login"} size={1} />
        </Link>
        <IconButton
          name={isDark ? "Moon" : "Sun"}
          size={1}
          onClick={onThemeToggle}
        />
      </MainNav>
      <SearchInput icon="Search" placeholder="Search" onChange={() => null} />
      <Content>{children}</Content>
      <Footer>
        © {new Date().getFullYear()} NickOvchinnikov. All rights reserved.
      </Footer>
    </Wrapper>
  );
};
