import {
  createAsyncThunk,
  createSlice,
  AsyncThunk,
  PrepareAction,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import { RootState } from "@/store";

export type LoginData = {
  identifier?: string;
  password?: string;
};

export type RegistrationData = {
  username: string;
  email: string;
  password: string;
};

type RequestState = "pending" | "fulfilled" | "rejected";

export type UserState = {
  jwt: string;
  username: string;
  email: string;
  requestState?: RequestState;
  error?: SerializedError;
};

const initialState: UserState = {
  jwt: "",
  username: "",
  email: "",
};

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...payload,
    }),
    clear: () => ({
      jwt: "",
      username: "",
      email: "",
    }),
  },
  extraReducers: (builder) => {
    /** Login flow */
    builder
      .addMatcher<PayloadAction<UserPayload>>(
        // matcher can be defined inline as a type predicate function
        (action): action is FulfilledAction =>
          /\/(login|registration)\/fulfilled$/.test(action.type),
        (state, { payload }) => {
          state.requestState = "fulfilled";
          state.jwt = payload.jwt;
          state.username = payload.user.username;
          state.email = payload.user.email;
          state.error = undefined;
        }
      )
      // pending action
      .addMatcher(
        // matcher can be defined inline as a type predicate function
        (action): action is PendingAction => action.type.endsWith("/pending"),
        (state) => {
          state.requestState = "pending";
        }
      )
      // rejection handler
      .addMatcher(
        // matcher can be defined inline as a type predicate function
        (action): action is RejectedAction => action.type.endsWith("/rejected"),
        (state, { payload }) => {
          const payloadError = (payload as { error: SerializedError })?.error;
          state.error = payloadError;
          state.requestState = "rejected";
        }
      );
  },
});

export const selectUser = (state: RootState) => state.user;

const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const { actions, reducer } = userSlice;

type UserPayload = { jwt: string; user: { username: string; email: string } };

const clearUserInfoFromLocalStorage = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
};

const setupUserInfoToLocalStorage = (result: UserPayload) => {
  localStorage.setItem("jwt", result.jwt);
  localStorage.setItem("username", result?.user?.username);
  localStorage.setItem("email", result?.user?.email);
};

export const login = createAsyncThunk<UserPayload, LoginData>(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    const jwt = localStorage.getItem("jwt");

    const response = jwt
      ? await fetch(`${api_url}/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
      : await fetch(`${api_url}/auth/local`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

    const data = await response.json();

    if (response.status < 200 || response.status >= 300) {
      clearUserInfoFromLocalStorage();
      return rejectWithValue(data);
    }

    const result = jwt ? { jwt, user: data } : data;

    setupUserInfoToLocalStorage(result);

    return result;
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (data, { dispatch }) => {
    dispatch(actions.clear());
    clearUserInfoFromLocalStorage();
  }
);

export const registration = createAsyncThunk<UserPayload, RegistrationData>(
  "user/registration",
  async (data, { rejectWithValue }) => {
    const response = await fetch(`${api_url}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(result);
    }

    setupUserInfoToLocalStorage(result);

    return result;
  }
);
