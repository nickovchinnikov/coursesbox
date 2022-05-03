import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
  jwt: string;
  username: string;
  email: string;
};

const initialState: UserState = {
  jwt: "",
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});
