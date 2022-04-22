import type { NextPage } from "next";
import Link from "next/link";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

import { CenteredTile } from "@/components/Tile";
import { Input, Feedback } from "@/components/Input";
import { Button } from "@/components/Button";
import { StyledLink } from "@/components/StyledLink";

const Wrapper = styled(CenteredTile)`
  height: 83vh;
`;

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`;

const Signin: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log("submit: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper
        header={
          <>
            Sign In /{" "}
            <Link href="/signup" passHref>
              <StyledLink underline>Sign Up</StyledLink>
            </Link>
          </>
        }
      >
        <StyledInput
          label="username or email"
          minLength={6}
          feedback={errors.identity && <Feedback>Email or username!</Feedback>}
          placeholder="username or email"
          {...register("identity", { required: true, pattern: /^\S+$/i })}
        />
        <StyledInput
          label="password"
          type="password"
          minLength={6}
          feedback={
            errors.password && <Feedback>Min length 6 symbols!</Feedback>
          }
          placeholder="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        <Button type="submit">Sign In</Button>
      </Wrapper>
    </form>
  );
};

export default Signin;
