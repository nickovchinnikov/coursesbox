import { mockUser } from "@/mocks/user";

import { reducer, actions, initialState, login } from "./userSlice";

const updatedState = {
  jwt: mockUser.jwt,
  username: mockUser.user.username,
  email: mockUser.user.email,
};

const loginData = {
  identifier: mockUser.user.email,
  password: mockUser.user.password,
};

const requestId = "someid";

describe("User slice check", () => {
  describe("Update state actions", () => {
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
      const stateWithUpdatedValues = reducer(
        initialState,
        actions.update(updatedState)
      );

      expect(stateWithUpdatedValues).toEqual(updatedState);

      expect(reducer(stateWithUpdatedValues, actions.clear())).toEqual(
        initialState
      );
    });
  });

  describe("Login state flow", () => {
    it("should set the request state to pending", () => {
      expect(
        reducer(
          {
            ...initialState,
            error: {
              message: "Rejected",
            },
          },
          login.pending(requestId, loginData)
        )
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
});
