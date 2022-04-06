import { FC } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

import { Logo } from "@/components/Logo";
import { Input } from "@/components/Input";
import { IconButton } from "@/components/IconButton";

const Wrapper = styled.div`
  display: grid;
  gap: 0.1rem;
  color: ${({ theme }) => theme.font.regular};
  background-color: ${({ theme }) => theme.background};
  padding: 0.5rem;
  grid-template-areas:
    "header"
    "nav"
    "search"
    "content"
    "footer";
  @media (min-width: 500px) {
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
      "header  search"
      "nav     nav"
      "content content"
      "footer  footer";
    nav {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  @media (min-width: 700px) {
    grid-template-columns: 1fr 4fr 2fr;
    grid-template-areas:
      "header  search  nav"
      "content content content"
      "footer  footer  footer";
    nav {
      flex-direction: row;
    }
  }
`;

const StyledLogo = styled(Logo)`
  grid-area: header;
  display: flex;
  align-items: center;
  height: 4rem;
  @media (max-width: 500px) {
    justify-content: center;
  }
`;

const LogoLink = styled.a`
  all: unset;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const MainNav = styled.nav`
  grid-area: nav;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
  a {
    cursor: pointer;
    color: ${({ theme }) => theme.font.regular};
    &:hover {
      opacity: 0.7;
    }
  }
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

export const Layout: FC = ({ children }) => (
  <Wrapper>
    <Link href="/" passHref>
      <LogoLink>
        <StyledLogo size={3}>C8X</StyledLogo>
      </LogoLink>
    </Link>
    <MainNav>
      <Link href="/all">All</Link>
      <Link href="/news">News</Link>
      <IconButton name="Moon" size={1} onClick={() => null} />
    </MainNav>
    <SearchInput icon="Search" placeholder="Search" onChange={() => null} />
    <Content>{children}</Content>
    <Footer>
      © {new Date().getFullYear()} NickOvchinnikov. All rights reserved.
    </Footer>
  </Wrapper>
);
