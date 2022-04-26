import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

export type LoginData = {
  identifier?: string;
  password?: string;
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

const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

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
    builder.addCase(login.pending, (state) => {
      state.requestState = "pending";
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.requestState = "fulfilled";
      state.jwt = payload.jwt;
      state.username = payload.user.username;
      state.email = payload.user.email;
      state.error = undefined;
    });
    builder.addCase(login.rejected, (state, { payload, error }) => {
      const payloadError = (payload as { error: SerializedError })?.error;
      state.error = payloadError ? payloadError : error;
      state.requestState = "rejected";
    });
  },
});

export const { actions, reducer } = userSlice;

const clearUserInfoFromLocalStorage = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
};

type LoginPayload = { jwt: string; user: { username: string; email: string } };

export const login = createAsyncThunk<LoginPayload, LoginData>(
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

    localStorage.setItem("jwt", result.jwt);
    localStorage.setItem("username", result?.user?.username);
    localStorage.setItem("email", result?.user?.email);

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
