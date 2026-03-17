import { baseApi } from "./baseApi";
import type { AuthRequest, AuthResponse } from "../types/auth";
import { ApiEndpoints, APIMethods } from "../constants/constants";

export const apiAuth = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: ({ username, password }) => ({
        url: ApiEndpoints.LOGIN,
        method: APIMethods.POST,
        body: { username, password },
      }),
    }),
    register: builder.mutation<AuthResponse, AuthRequest>({
      query: ({ username, password }) => ({
        url: ApiEndpoints.REGISTER,
        method: APIMethods.POST,
        body: { username, password },
      }),
    }),
    getMe: builder.query<string, void>({
      query: () => ({
        url: ApiEndpoints.ME,
        method: APIMethods.GET,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: ApiEndpoints.LOGOUT,
        method: APIMethods.POST,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLogoutMutation,
} = apiAuth;