import { useState, useLayoutEffect, useEffect, FC, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@emotion/react";

import { AppDispatch, RootState } from "@/store";
import { Themes } from "@/styles/themes";
import { login, selectUser } from "@/services/userSlice";

import { IconButton } from "@/components/IconButton";

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
  const router = useRouter();
  const { q } = router.query;
  const [query, setQuery] = useState(q);

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

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setQuery(value);
    if (value?.length >= 2) {
      router.push({
        pathname: "/search",
        query: { q: value },
      });
    }
    if (!value) {
      router.push("/");
    }
  };

  useEffect(() => {
    q && setQuery(q);
    if (query && !q) {
      setQuery("");
    }
  }, [q]);

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
          <Link href={username ? "/user" : "/login"} passHref>
            <IconButton name={username ? "User" : "Login"} size={1} />
          </Link>
          <IconButton
            name={!isDark ? "Moon" : "Sun"}
            size={1}
            onClick={toggleDark}
          />
        </MainNav>
        <SearchInput
          icon="Search"
          placeholder="Search"
          value={query}
          onChange={searchChange}
        />
        <Content>{children}</Content>
        <Footer>
          © {new Date().getFullYear()} NickOvchinnikov. All rights reserved.
        </Footer>
      </Wrapper>
    </ThemeProvider>
  );
};
