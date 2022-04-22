import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "@emotion/styled";

import { Button } from "@/components/Button";
import { CenteredTile } from "@/components/Tile";

const User: NextPage = () => {
  const router = useRouter();
  const { data, error } = useSWR("/users/me");

  const logout = () => {
    localStorage.removeItem("jwt");
    router.push("/");
  };

  console.log("data: ", data);
  console.log("error: ", error);

  if (data?.error) {
    router.push("/login");
  }

  return data ? (
    <CenteredTile header="Profile">
      <h3>username: {data?.username}</h3>
      <h3>email: {data?.email}</h3>
      <Button onClick={logout}>Logout</Button>
    </CenteredTile>
  ) : null;
};

export default User;
