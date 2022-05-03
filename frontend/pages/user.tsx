import type { NextPage } from "next";

import { CenteredTile } from "@/components/Tile";
import { Button } from "@/components/Button";

const User: NextPage = () => {
  const userMock = { username: "John Doe", email: "john@doe.com" };

  const logoutHandler = async () => {
    console.log("logout");
  };

  return (
    <CenteredTile header="Profile">
      <h3>username: {userMock.username}</h3>
      <h3>email: {userMock.email}</h3>
      <Button onClick={logoutHandler}>Logout</Button>
    </CenteredTile>
  );
};

export default User;
