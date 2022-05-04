import { rest } from "msw";

import { LoginData } from "@/services/userSlice";

import { mockUser, ValidationError } from "./user";

const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const handlers = [
  rest.post<LoginData>(`${api_url}/auth/local`, (req, res, ctx) => {
    const data = req.body;

    if (
      data.identifier === mockUser.user.email &&
      data.password === mockUser.user.password
    ) {
      return res(ctx.status(200), ctx.json(mockUser));
    }

    return res(ctx.status(400), ctx.json(ValidationError));
  }),

  rest.get(`${api_url}/users/me`, (req, res, ctx) => {
    if (req.headers.get("Authorization") === `Bearer ${mockUser.jwt}`) {
      return res(ctx.status(200), ctx.json(mockUser.user));
    }

    return res(ctx.status(400), ctx.json(ValidationError));
  }),
];
