import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  tagTypes: ["Auth", "Vendor"],

  endpoints: (builder) => ({
    //login
    login: builder.mutation<
      any,
      {
        emailOrPhoneNumber: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),

    //register
    registerVendor: builder.mutation<
      any,
      {
        emailOrPhoneNumber: string;
        password: string;
        fullName: string;
        address: string;
        businessName: string;
      }
    >({
      query: (body) => ({
        url: "/vendors",
        method: "POST",
        body,
      }),
    }),

    // Add the new Google auth endpoint
    googleAuth: builder.mutation({
      query: (data) => ({
        url: "/users/google",
        method: "POST",
        body: data,
      }),
    }),

    getAllUsers: builder.query<any, void>({
      query: () => `/users`,
      providesTags: [{ type: "Auth", id: "Auth" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterVendorMutation,
  useGoogleAuthMutation,
  useGetAllUsersQuery,
} = authApi;
