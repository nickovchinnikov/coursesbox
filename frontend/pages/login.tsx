import type { NextPage } from "next";
import Link from "next/link";
import styled from "@emotion/styled";

import { CenteredTile } from "@/components/Tile";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { StyledLink } from "@/components/StyledLink";

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`;

const Login: NextPage = () => {
  const onSubmit = () => {};
  return (
    <form onSubmit={onSubmit}>
      <CenteredTile header="Login">
        <StyledInput label="Identifier" placeholder="username or email" />
        <StyledInput label="Password" type="password" placeholder="password" />
        <Button type="submit">Sign In</Button>
        <h3>
          <Link href="/registration" passHref>
            <StyledLink underline>Create account</StyledLink>
          </Link>
        </h3>
      </CenteredTile>
    </form>
  );
};

export default Login;
