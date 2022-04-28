import Link from "next/link";
import type { NextPage } from "next";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { CenteredTile } from "@/components/Tile";
import { Input, Feedback } from "@/components/Input";
import { Button } from "@/components/Button";
import { StyledLink } from "@/components/StyledLink";

import { RootState, AppDispatch } from "@/store";
import {
  RegistrationData,
  UserState,
  selectUser,
  registration,
} from "@/services/userSlice";

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
  } = useForm<RegistrationData>();
  const router = useRouter();

  const { jwt, error: serverError } = useSelector<RootState, UserState>(
    (state) => selectUser(state)
  );

  const dispatch = useDispatch<AppDispatch>();

  if (Boolean(jwt) && !serverError) {
    router.push("/user");
  }

  const onSubmit = async (data: RegistrationData) => {
    await dispatch(registration(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper header="Create an account">
        <h3>
          <Feedback>{serverError?.message} &nbsp;</Feedback>
        </h3>
        <StyledInput
          label="username"
          minLength={6}
          feedback={
            errors.username && (
              <Feedback>Letters and digits, min 6 symbols!</Feedback>
            )
          }
          placeholder="username"
          type="username"
          {...register("username", {
            required: true,
            minLength: 6,
            pattern: /^[\w\d\s]+$/,
          })}
        />
        <StyledInput
          label="email"
          feedback={errors.email && <Feedback>Should be valid email!</Feedback>}
          placeholder="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/ })}
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
