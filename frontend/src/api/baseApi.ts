import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TagTypes } from "../constants/constants";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    credentials: "include",
  }),
  tagTypes: [TagTypes.TASKS, TagTypes.AUTH],
  endpoints: () => ({}),
});