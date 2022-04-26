import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "@/store";
import { logout, UserState } from "@/services/userSlice";

import { Button } from "@/components/Button";
import { CenteredTile } from "@/components/Tile";

const User: NextPage = () => {
  const router = useRouter();
  const { data, error } = useSWR("/users/me");

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState, UserState>(({ user }) => user);

  const logoutHandler = async () => {
    await dispatch(logout());
    router.push("/");
  };

  console.log("data: ", data);
  console.log("error: ", error);

  if (user.error || data?.error || error) {
    dispatch(logout());
    router.push("/login");
  }

  return data ? (
    <CenteredTile header="Profile">
      <h3>username: {data?.username}</h3>
      <h3>email: {data?.email}</h3>
      <Button onClick={logoutHandler}>Logout</Button>
    </CenteredTile>
  ) : null;
};

export default User;
