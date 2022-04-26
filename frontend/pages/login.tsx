import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

import { RootState, AppDispatch } from "@/store";
import { login, logout } from "@/services/userSlice";

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

type LoginForm = {
  identifier: string;
  password: string;
};

const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const jwt = useSelector<RootState, string>(({ user }) => user.jwt);
  const serverError = useSelector<RootState, SerializedError | undefined>(
    ({ user }) => user.error
  );

  const dispatch = useDispatch<AppDispatch>();

  if (Boolean(jwt) && serverError) {
    dispatch(logout());
  }

  if (Boolean(jwt) && !serverError) {
    router.push("/user");
  }

  const onSubmit = async (data: LoginForm) => {
    await dispatch(login(data));
  };

  useEffect(() => {
    const subscription = watch(() => error && setError(null));
    return () => subscription.unsubscribe();
  }, [error, watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper header="Login">
        <h3>
          <Feedback>{error} &nbsp;</Feedback>
          <Feedback>{serverError?.message}</Feedback>
        </h3>
        <StyledInput
          label="Identifier"
          minLength={6}
          feedback={
            errors.identifier && <Feedback>Invalid identifier!</Feedback>
          }
          placeholder="username or email"
          {...register("identifier", { required: true, pattern: /^\S+$/i })}
        />
        <StyledInput
          label="password"
          type="password"
          minLength={6}
          feedback={errors.password && <Feedback>Invalid password!</Feedback>}
          placeholder="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        <Button type="submit">Sign In</Button>
        <h3>
          <Link href="/registration" passHref>
            <StyledLink underline>Create account</StyledLink>
          </Link>
        </h3>
      </Wrapper>
    </form>
  );
};

export default Login;
