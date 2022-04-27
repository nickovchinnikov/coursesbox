import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "@/store";
import { logout, UserState, selectUser } from "@/services/userSlice";

import { Button } from "@/components/Button";
import { CenteredTile } from "@/components/Tile";

const User: NextPage = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState, UserState>(selectUser);

  const logoutHandler = async () => {
    await dispatch(logout());
    router.push("/");
  };

  useEffect(() => {
    if (!user.jwt || Boolean(user.error)) {
      dispatch(logout());
      router.push("/login");
    }
  }, []);

  return user.username && user.email ? (
    <CenteredTile header="Profile">
      <h3>username: {user.username}</h3>
      <h3>email: {user.email}</h3>
      <Button onClick={logoutHandler}>Logout</Button>
    </CenteredTile>
  ) : null;
};

export default User;
