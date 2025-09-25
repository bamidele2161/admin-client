import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import Cookies from "js-cookie";

// const queryBuilder = (params: { [key: string]: string }) => {
//   if (!params || Object.keys(params).length === 0) return "";
//   const filteredParams = Object.entries(params)
//     .filter(
//       ([_, value]) => value !== null && value != undefined && value !== ""
//     )
//     .reduce((acc, [key, value]) => {
//       acc[key] = value;
//       return acc;
//     }, {} as { [key: string]: string });

//   return new URLSearchParams(filteredParams).toString();
// };

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  any,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseResult = await fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (
      headers
      // { getState }
    ) => {
      // const userToken = (getState() as RootState)?.auth?.userInfo
      //   ?.refresh_token;
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

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: customBaseQuery,

  tagTypes: ["Vendor", "Products"],

  endpoints: (builder) => ({
    getAllVendors: builder.query<any, void>({
      query: () => `/vendors`,
      providesTags: [{ type: "Vendor", id: "Vendor" }],
    }),

    updateVendor: builder.mutation<
      any,
      { id: number; body: { status: string } }
    >({
      query: ({ id, body }) => ({
        url: `vendors/${id}/status`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: [{ type: "Vendor", id: "Vendor" }],
    }),
    getAllProducts: builder.query<any, void>({
      query: () => `/products/all-products`,
      providesTags: [{ type: "Products", id: "Products" }],
    }),

    updateProduct: builder.mutation<
      any,
      { id: number; body: { status: string } }
    >({
      query: ({ id, body }) => ({
        url: `products/${id}/status`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: [{ type: "Vendor", id: "Vendor" }],
    }),

    updateOrderStatus: builder.mutation<
      any,
      { id: number; body: { status: string } }
    >({
      query: ({ id, body }) => ({
        url: `orders/${id}/status`,
        method: "PUT",
        body,
      }),

      invalidatesTags: [{ type: "Products", id: "Products" }],
    }),
  }),
});

export const {
  useGetAllVendorsQuery,
  useUpdateVendorMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useUpdateOrderStatusMutation,
} = adminApi;
