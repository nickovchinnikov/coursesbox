import { FC } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

import { Logo } from "@/components/Logo";
import { Input } from "@/components/Input";
import { IconButton } from "@/components/IconButton";
import { StyledLink } from "@/components/StyledLink";

const Wrapper = styled.div`
  display: grid;
  gap: 0.1rem;
  color: ${({ theme }) => theme.font.regular};
  background-color: ${({ theme }) => theme.background};
  padding: 0.5rem;
  grid-template-areas:
    "header  nav"
    "search  search"
    "content content"
    "footer  footer";
  nav {
    flex-direction: row;
    justify-content: flex-end;
    gap: 5vmin;
  }
  @media (min-width: 500px) {
    grid-template-columns: 1fr 3fr;
  }
  @media (min-width: 960px) {
    grid-template-columns: 1fr 4fr 2fr;
    grid-template-areas:
      "header  search  nav"
      "content content content"
      "footer  footer  footer";
  }
`;

const LogoLink = styled(StyledLink)`
  padding-right: 1vw;
`;

const StyledLogo = styled(Logo)`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 4rem;
  & .logo_full {
    display: none;
  }
  @media (min-width: 560px) {
    & .logo_short {
      display: none;
    }
    & .logo_full {
      display: inline;
    }
  }
`;

const MainNav = styled.nav`
  grid-area: nav;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 2vmin;
`;

const SearchInput = styled(Input)`
  grid-area: search;
  width: 100%;
  height: 4rem;
`;

const Content = styled.main`
  grid-area: content;
`;

const Footer = styled.footer`
  grid-area: footer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 5rem;
`;

type Props = {
  isDark: boolean;
  onThemeToggle: () => void;
};

export const Layout: FC<Props> = ({ children, isDark, onThemeToggle }) => (
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
      <Link href="/news" passHref>
        <StyledLink>News</StyledLink>
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
