import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Task } from "../types/task";
import { ApiEndpoints } from "../constants/constants";

export const apiTasks = createApi({
    reducerPath: "apiTasks",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], void>({
            query: () => ApiEndpoints.TASKS,
        }),
    }),
});

export const { useGetTasksQuery } = apiTasks;