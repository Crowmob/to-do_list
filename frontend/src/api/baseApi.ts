import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TagTypes } from "../constants/constants";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes: [TagTypes.TASKS, TagTypes.AUTH],
  endpoints: () => ({}),
});