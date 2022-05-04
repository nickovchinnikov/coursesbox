import { useState, useLayoutEffect, useEffect, FC } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@emotion/react";

import { AppDispatch, RootState } from "@/store";
import { Themes } from "@/styles/themes";
import { login, selectUser } from "@/services/userSlice";

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

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const Layout: FC = ({ children }) => {
  const { username } = useSelector<RootState, RootState["user"]>(selectUser);
  const [isDark, setIsDark] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const toggleDark = () => {
    localStorage.setItem("theme", isDark ? "light" : "dark");
    setIsDark(!isDark);
  };

  useIsomorphicLayoutEffect(() => {
    dispatch(login());
    const theme = localStorage.getItem("theme");
    const themeExistsInStorage = Boolean(theme !== null);

    setIsDark(
      themeExistsInStorage
        ? Boolean(theme === "dark")
        : window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, []);

  const theme = Themes[isDark ? "dark" : "light"];

  return (
    <ThemeProvider theme={theme}>
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
          <Link href={username ? "/user" : "/login"} passHref>
            <IconButton name={username ? "User" : "Login"} size={1} />
          </Link>
          <IconButton
            name={!isDark ? "Moon" : "Sun"}
            size={1}
            onClick={toggleDark}
          />
        </MainNav>
        <SearchInput icon="Search" placeholder="Search" onChange={() => null} />
        <Content>{children}</Content>
        <Footer>
          © {new Date().getFullYear()} NickOvchinnikov. All rights reserved.
        </Footer>
      </Wrapper>
    </ThemeProvider>
  );
};
