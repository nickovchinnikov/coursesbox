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

const Registration: NextPage = () => {
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
      <Wrapper header="Create an account">
        <StyledInput
          label="username"
          minLength={6}
          feedback={
            errors.username && <Feedback>Only letters and digits!</Feedback>
          }
          placeholder="username"
          type="username"
          {...register("username", { required: true, pattern: /^\S+$/i })}
        />
        <StyledInput
          label="email"
          feedback={errors.email && <Feedback>Should be valid email!</Feedback>}
          placeholder="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
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
        <Button type="submit">Sign Up</Button>
        <h3>
          <Link href="/login" passHref>
            <StyledLink underline>Login</StyledLink>
          </Link>
        </h3>
      </Wrapper>
    </form>
  );
};

export default Registration;
