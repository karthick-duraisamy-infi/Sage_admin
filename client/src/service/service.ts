import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_PATH = "/sageAdmin";

const CommonService = createApi({
  reducerPath: "CommonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //   // Example: token from localStorage
    //   const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY2MDU1NzczLCJpYXQiOjE3NjYwNTQ4NzMsImp0aSI6ImI2YTQ1MmZlNmFkMzRhNmViZWVjNTVlN2UwOWE3OTE4IiwidXNlcl9pZCI6OX0.HfvVWa4LT1U2hfuycQWkVWSeuQquJjryaXROpPsTAoo`;

    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }

    //   // Optional custom headers
    //   headers.set("Accept", "application/json");
    //   headers.set("Content-Type", "application/json");

    //   return headers;
    // },
  }),

  tagTypes: ["users", "roles", "api-keys", "organizations", "settings"],
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
