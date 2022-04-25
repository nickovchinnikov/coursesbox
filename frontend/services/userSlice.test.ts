import { configureStore } from "@reduxjs/toolkit";

import { storeCreator } from "@/store";

import { reducer, actions, login, logout } from "./userSlice";

const initialState = {
  jwt: "",
  username: "",
  email: "",
};

const updatedState = {
  jwt: "sometokenhere",
  username: "username",
  email: "username@user.com",
};

const loginData = {
  identifier: updatedState.email,
  password: "somepassword",
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
    it("should set the request state to fulfilled", () => {
      expect(
        reducer(
          initialState,
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
      expect(
        reducer(
          initialState,
          login.rejected(new Error("Server error"), requestId, loginData)
        )
      ).toEqual({
        ...initialState,
        requestState: "rejected",
      });
    });
  });
});
