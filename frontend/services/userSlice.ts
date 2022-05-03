import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  jwt: string;
  username: string;
  email: string;
};

export const initialState: UserState = {
  jwt: "",
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...payload,
    }),
    clear: () => initialState,
  },
});

export const { actions, reducer } = userSlice;
