import type { NextPage } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";

import { CenteredTile } from "@/components/Tile";
import { Input, ConditionalFeedback } from "@/components/Input";
import { Button } from "@/components/Button";
import { StyledLink } from "@/components/StyledLink";

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`;

export type RegistrationForm = {
  username: string;
  email: string;
  password: string;
};

const Registration: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>();

  const onSubmit = (data: RegistrationForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenteredTile header="Create an account">
        <StyledInput
          label="username"
          placeholder="username"
          feedback={
            <ConditionalFeedback>
              {errors.username?.message}
            </ConditionalFeedback>
          }
          {...register("username", {
            required: "Required field!",
            minLength: { value: 6, message: "Min length 6!" },
            pattern: {
              value: /^[\w\d\s]+$/,
              message: "Only letters, numbers and spaces!",
            },
          })}
        />
        <StyledInput
          label="email"
          feedback={
            <ConditionalFeedback>{errors.email?.message}</ConditionalFeedback>
          }
          placeholder="email"
          type="email"
          {...register("email", {
            required: "Required field!",
            pattern: {
              value: /^\S+@\S+$/,
              message: "Invalid email!",
            },
          })}
        />
        <StyledInput
          label="password"
          type="password"
          role="textbox"
          feedback={
            <ConditionalFeedback>
              {errors.password?.message}
            </ConditionalFeedback>
          }
          placeholder="password"
          {...register("password", {
            required: "Required field!",
            minLength: { value: 8, message: "Min length 8!" },
          })}
        />
        <Button type="submit">Sign Up</Button>
        <h3>
          <Link href="/login" passHref>
            <StyledLink underline>Login</StyledLink>
          </Link>
        </h3>
      </CenteredTile>
    </form>
  );
};

export default Registration;
