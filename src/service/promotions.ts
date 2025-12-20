import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  any,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseResult = await fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const userToken = Cookies.get("ashoboxToken");
      if (userToken) {
        headers.set("Authorization", `Bearer ${userToken}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  const newResponse: any = {
    ...baseResult,
  };

  const errorCode = newResponse?.error?.status;

  if (errorCode === 401) {
    localStorage.clear();
    window.location.href = "/";
  }
  return baseResult;
};

export const promotionApi = createApi({
  reducerPath: "promotionApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Promotions"],
  endpoints: (builder) => ({
    getAllPromotions: builder.query<any, void>({
      query: () => "/promotions",
      providesTags: ["Promotions"],
    }),
    getPromotionById: builder.query<any, string>({
      query: (id) => `/promotions/${id}`,
      providesTags: (id) => [{ type: "Promotions", id }],
    }),
    createPromotion: builder.mutation<any, any>({
      query: (body) => ({
        url: "/promotions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Promotions"],
    }),
    updatePromotion: builder.mutation<any, { id: string | number; body: any }>({
      query: ({ id, body }) => ({
        url: `/promotions/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Promotions"],
    }),
    deletePromotion: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/promotions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Promotions"],
    }),
  }),
});

export const {
  useGetAllPromotionsQuery,
  useGetPromotionByIdQuery,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} = promotionApi;
