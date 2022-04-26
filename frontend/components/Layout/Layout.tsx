import { useEffect, FC } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { SWRConfig } from "swr";

import { RootState, AppDispatch } from "@/store";
import { login } from "@/services/userSlice";

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

const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const Layout: FC<Props> = ({ children, isDark, onThemeToggle }) => {
  const jwt = useSelector<RootState, string>(({ user }) => user.jwt);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (jwt) {
      dispatch(login({}));
    }
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => {
          return fetch(`${api_url}${resource}`, {
            ...init,
            headers: {
              ...init?.headers,
              Authorization: `Bearer ${jwt}`,
            },
          }).then((res) => res.json());
        },
      }}
    >
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
    </SWRConfig>
  );
};
