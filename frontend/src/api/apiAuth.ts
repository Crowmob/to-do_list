import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthRequest, AuthResponse } from "../types/auth";
import { ApiEndpoints } from "../constants/constants";

export const apiAuth = createApi({
  reducerPath: "apiAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    credentials: "include",
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: ({ username, password }) => ({
        url: ApiEndpoints.LOGIN,
        method: "POST",
        body: { username, password },
      }),
    }),
    register: builder.mutation<AuthResponse, AuthRequest>({
      query: ({ username, password }) => ({
        url: ApiEndpoints.REGISTER,
        method: "POST",
        body: { username, password },
      }),
    }),
    getMe: builder.query<string, void>({
      query: () => ({
        url: ApiEndpoints.ME,
        method: "GET",
      }),
    }),
    logout: builder.mutation<undefined, void>({
      query: () => ({
        url: ApiEndpoints.LOGOUT,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetMeQuery, useLogoutMutation } = apiAuth;