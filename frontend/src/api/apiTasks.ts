import { baseApi } from "./baseApi";
import type { TaskActionRequest, Task } from "../types/task";
import { ApiEndpoints, APIMethods, TagTypes } from "../constants/constants";

export const apiTasks = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => ApiEndpoints.TASKS,
      providesTags: [TagTypes.TASKS]
    }),
    createTask: builder.mutation<void, TaskActionRequest>({
      query: (newTask) => ({
        url: ApiEndpoints.TASKS,
        method: APIMethods.POST,
        body: newTask,
      }),
      invalidatesTags: [TagTypes.TASKS]
    }),
    updateTask: builder.mutation<void, TaskActionRequest & { taskId: number }>({
      query: ({ name, priority, completed, taskId }) => ({
        url: `${ApiEndpoints.TASKS}/${taskId}`,
        method: APIMethods.PUT,
        body: { name, priority, completed },
      }),
      invalidatesTags: [TagTypes.TASKS]
    }),
    deleteTask: builder.mutation<void, { taskId: number }>({
      query: ({ taskId }) => ({
        url: `${ApiEndpoints.TASKS}/${taskId}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [TagTypes.TASKS]
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = apiTasks;