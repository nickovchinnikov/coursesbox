export const mockUser = {
  jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjUwOTAxNjEwLCJleHAiOjE2NTM0OTM2MTB9.5XCgAR25c3AH_09Jv31CWNF-48mpRqGUat79XGYuNJo",
  user: {
    id: 5,
    username: "John Doe",
    email: "john@doe.com",
    password: "testpass123!",
    provider: "local",
    confirmed: true,
    blocked: false,
    createdAt: "2022-04-20T12:58:41.661Z",
    updatedAt: "2022-04-20T12:58:41.661Z",
  },
};

export const ValidationError = {
  error: {
    status: 400,
    name: "ValidationError",
    message: "Invalid identifier or password",
    details: {},
  },
};

export const RegistrationError = {
  error: {
    status: 400,
    name: "ApplicationError",
    message: "An error occurred during account creation",
    details: {},
  },
};
