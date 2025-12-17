import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_PATH = "/sageAdmin";

const CommonService = createApi({
  reducerPath: "CommonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  tagTypes: ["users", "roles", "api-keys", "organizations"],
  endpoints: () => ({}),
});

const LocalService = createApi({
  reducerPath: "LocalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_PATH + "/",
    credentials: "include",
  }),
  endpoints: () => ({}),
});

export { CommonService, LocalService };
