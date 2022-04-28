import { storeCreator } from "@/store";
import { mockUser } from "@/mocks/user";

import { reducer, actions, login, registration, logout } from "./userSlice";

const initialState = {
  jwt: "",
  username: "",
  email: "",
};

const updatedState = {
  jwt: mockUser.jwt,
  username: mockUser.user.username,
  email: mockUser.user.email,
};

const loginData = {
  identifier: mockUser.user.email,
  password: mockUser.user.password,
};

const registrationData = {
  username: mockUser.user.username,
  email: mockUser.user.email,
  password: mockUser.user.password,
};

const requestId = "someid";

describe("User slice check", () => {
  describe("Update state actions", () => {
    const initialState = {
      jwt: "sometokenhere",
      username: "username",
      email: "username@user.com",
    };

    it("should update the full state", () => {
      expect(reducer(initialState, actions.update(updatedState))).toEqual(
        updatedState
      );
    });

    it("should update only the jwt", () => {
      expect(
        reducer(
          initialState,
          actions.update({
            jwt: updatedState.jwt,
          })
        )
      ).toEqual({
        ...initialState,
        jwt: updatedState.jwt,
      });
    });

    it("should clear the state", () => {
      expect(reducer(initialState, actions.clear())).toEqual({
        jwt: "",
        username: "",
        email: "",
      });
    });
  });

  describe("Login state flow", () => {
    it("should set the request state to pending", () => {
      expect(
        reducer(initialState, login.pending(requestId, loginData))
      ).toEqual({
        ...initialState,
        requestState: "pending",
      });
    });
    it("should set the request state to fulfilled and reset any previous errors", () => {
      expect(
        reducer(
          {
            ...initialState,
            error: {
              message: "Rejected",
            },
          },
          login.fulfilled(
            {
              jwt: updatedState.jwt,
              user: {
                username: updatedState.username,
                email: updatedState.email,
              },
            },
            requestId,
            loginData
          )
        )
      ).toEqual({
        ...updatedState,
        requestState: "fulfilled",
      });
    });
    it("should set the request state to rejected", () => {
      const payloadError = { error: { name: "500", message: "Server error" } };
      expect(
        reducer(
          initialState,
          login.rejected({} as Error, requestId, loginData, payloadError)
        )
      ).toEqual({
        ...initialState,
        error: payloadError.error,
        requestState: "rejected",
      });
    });
  });

  describe("Login/Logout async flow", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("success login flow", async () => {
      const store = storeCreator();
      await store.dispatch(login(loginData));
      const state = store.getState();

      expect(state).toEqual({
        user: {
          ...updatedState,
          requestState: "fulfilled",
        },
      });
      // Check that the data is stored in localStorage
      expect(localStorage.getItem("jwt")).toBe(mockUser.jwt);
      expect(localStorage.getItem("username")).toBe(mockUser.user.username);
      expect(localStorage.getItem("email")).toBe(mockUser.user.email);
    });
    it("fail login flow", async () => {
      const store = storeCreator();
      await store.dispatch(login({ ...loginData, password: "wrongpass" }));
      const state = store.getState();

      expect(state).toEqual({
        user: {
          jwt: "",
          username: "",
          email: "",
          error: {
            status: 400,
            name: "ValidationError",
            message: "Invalid identifier or password",
            details: {},
          },
          requestState: "rejected",
        },
      });
      // Check that the data is stored in localStorage
      expect(localStorage.getItem("jwt")).toBe(null);
      expect(localStorage.getItem("username")).toBe(null);
      expect(localStorage.getItem("email")).toBe(null);
    });
    it("login flow with saved jwt", async () => {
      expect(localStorage.getItem("jwt")).toBe(null);

      // Set the jwt in localStorage
      localStorage.setItem("jwt", mockUser.jwt);

      const store = storeCreator();
      // In this case the jwt is already saved in localStorage
      await store.dispatch(login({}));
      const state = store.getState();

      expect(state).toEqual({
        user: {
          ...updatedState,
          requestState: "fulfilled",
        },
      });
    });
    it("logout flow", async () => {
      const store = storeCreator();
      await store.dispatch(login(loginData));
      const stateForSignedInUser = store.getState();

      expect(stateForSignedInUser).toEqual({
        user: {
          ...updatedState,
          requestState: "fulfilled",
        },
      });

      await store.dispatch(logout());
      const stateForSignedOutUser = store.getState();

      expect(stateForSignedOutUser).toEqual({
        user: {
          jwt: "",
          username: "",
          email: "",
        },
      });

      // Check that the data is stored in localStorage
      expect(localStorage.getItem("jwt")).toBe(null);
      expect(localStorage.getItem("username")).toBe(null);
      expect(localStorage.getItem("email")).toBe(null);
    });
  });

  describe("Registration state flow", () => {
    it("fail registration flow", async () => {
      const store = storeCreator();
      await store.dispatch(
        registration({ email: "test", username: "test", password: "wrong" })
      );
      const state = store.getState();

      expect(state).toEqual({
        user: {
          jwt: "",
          username: "",
          email: "",
          error: {
            status: 400,
            name: "ApplicationError",
            message: "An error occurred during account creation",
            details: {},
          },
          requestState: "rejected",
        },
      });
      // Check that the data is stored in localStorage
      expect(localStorage.getItem("jwt")).toBe(null);
      expect(localStorage.getItem("username")).toBe(null);
      expect(localStorage.getItem("email")).toBe(null);
    });
    it("success registration flow", async () => {
      const store = storeCreator();
      await store.dispatch(registration(registrationData));
      const state = store.getState();

      expect(state).toEqual({
        user: {
          ...updatedState,
          requestState: "fulfilled",
        },
      });
      // Check that the data is stored in localStorage
      expect(localStorage.getItem("jwt")).toBe(mockUser.jwt);
      expect(localStorage.getItem("username")).toBe(mockUser.user.username);
      expect(localStorage.getItem("email")).toBe(mockUser.user.email);
    });
  });
});
