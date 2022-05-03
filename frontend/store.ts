import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./services/userSlice";

export const rootReducer = {
  user: userSlice.reducer,
};

export const storeCreator = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = storeCreator();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
