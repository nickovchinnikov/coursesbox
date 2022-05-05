import { configureStore } from "@reduxjs/toolkit";

import { mockUser, ValidationError, RegistrationError } from "@/mocks/user";

import {
  reducer,
  initialState,
  login,
  logout,
  registration,
} from "./userSlice";

const storeCreator = () => configureStore({ reducer: { user: reducer } });

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

describe("User slice check", () => {
  describe("Login async flow", () => {
    beforeEach(() => {
      localStorage.clear();
    });
    it("success login flow", async () => {
      const store = storeCreator();
      const stateBeforeLogin = store.getState();
      expect(stateBeforeLogin).toEqual({
        user: {
          ...initialState,
        },
      });
      await store.dispatch(login(loginData));
      const stateAfterLogin = store.getState();
      expect(stateAfterLogin).toEqual({
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
          ...initialState,
          requestState: "rejected",
          ...ValidationError,
        },
      });
    });

    it("login flow with saved jwt", async () => {
      // Set the jwt in localStorage
      localStorage.setItem("jwt", mockUser.jwt);

      const store = storeCreator();
      // In this case the jwt is already saved in localStorage
      await store.dispatch(login());
      const state = store.getState();

      expect(state).toEqual({
        user: {
          ...updatedState,
          requestState: "fulfilled",
        },
      });
    });
  });

  describe("Logout flow", () => {
    beforeEach(() => {
      localStorage.clear();
    });
    it("logout action", async () => {
      // Login
      const store = storeCreator();
      await store.dispatch(login(loginData));
      const stateAfterLogin = store.getState();
      expect(stateAfterLogin).toEqual({
        user: {
          ...updatedState,
          requestState: "fulfilled",
        },
      });

      // Check that the data is stored in localStorage
      expect(localStorage.getItem("jwt")).toBe(mockUser.jwt);
      expect(localStorage.getItem("username")).toBe(mockUser.user.username);
      expect(localStorage.getItem("email")).toBe(mockUser.user.email);

      // Logout
      await store.dispatch(logout());

      const stateAfterLogout = store.getState();
      expect(stateAfterLogout).toEqual({
        user: {
          ...initialState,
        },
      });
      // Check that the data is removed from localStorage
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
          ...RegistrationError,
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
