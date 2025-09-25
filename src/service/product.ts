import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { CreateOrderProps } from "../interfaces/Global";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import Cookies from "js-cookie";

const queryBuilder = (params: { [key: string]: string }) => {
  if (!params || Object.keys(params).length === 0) return "";
  const filteredParams = Object.entries(params)
    .filter(
      ([_, value]) => value !== null && value != undefined && value !== ""
    )
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });

  return new URLSearchParams(filteredParams).toString();
};

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

  // const newResponse: any = {
  //   ...baseResult,
  // };

  // const errorCode = newResponse?.error?.status;

  // if (errorCode === 401) {
  //   localStorage.clear();
  //   window.location.href = "/welcome";
  // }
  return baseResult;
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: customBaseQuery,

  tagTypes: ["Product", "Categories", "Order"],

  endpoints: (builder) => ({
    //register
    addDeliveryDetails: builder.mutation<
      any,
      {
        fullName: string;
        email: string;
        phoneNumber: string;
        address: string;
      }
    >({
      query: (body) => ({
        url: "/users/delivery-details",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Product", id: "Product" }],
    }),

    //add-product
    addProduct: builder.mutation<any, { body: any; categoryId: number }>({
      query: ({ body, categoryId }) => ({
        url: `/products/${categoryId}`,
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Product", id: "Product" }],
    }),
    editproduct: builder.mutation<any, { body: any; productId: number }>({
      query: ({ body, productId }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: [{ type: "Product", id: "Product" }],
    }),

    //archive-product
    archiveProduct: builder.mutation<any, { id: number; vendorId: number }>({
      query: ({ id, vendorId }) => ({
        url: `/products/archive/${id}/${vendorId}`,
        method: "DELETE",
      }),

      invalidatesTags: [{ type: "Product", id: "Product" }],
    }),

    //delete-product
    deleteProduct: builder.mutation<any, { id: number }>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: [{ type: "Product", id: "Product" }],
    }),

    //product-category
    getAllProductCategory: builder.query<any, void>({
      query: () => `/product-category`,
      providesTags: [{ type: "Categories", id: "Categories" }],
    }),

    //products
    getAllProducts: builder.query<any, any>({
      query: (params) => `/products?${queryBuilder(params)}`,
      providesTags: [{ type: "Product", id: "Product" }],
    }),
    //vendorproducts
    getAllVendorProducts: builder.query<any, { vendorId: any }>({
      query: (vendorId) => `/products/vendor/${vendorId}/products`,
      providesTags: [{ type: "Product", id: "Product" }],
    }),
    //add-order
    addOrder: builder.mutation<any, CreateOrderProps>({
      query: (body) => ({
        url: `/orders`,
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Order", id: "Order" }],
    }),
    getAllOrders: builder.query<any, void>({
      query: () => `/orders`,
      providesTags: [{ type: "Order", id: "Order" }],
    }),

    //order by vendor
    getAllOrdersByVendors: builder.query<any, { vendorId: any }>({
      query: (vendorId) => `/orders/vendor/${vendorId}/orders`,
      providesTags: [{ type: "Order", id: "Order" }],
    }),
    getProductById: builder.query<any, string>({
      query: (id) => `/products/${id}`,
      providesTags: [{ type: "Product", id: "Product" }],
    }),
    //add-category
    addCategory: builder.mutation<any, { name: string; description: string }>({
      query: (body) => ({
        url: `/product-category`,
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Categories", id: "Categories" }],
    }),

    //add-sub-category
    addSubCategory: builder.mutation<
      any,
      { categoryId: number; body: { name: string } }
    >({
      query: ({ categoryId, body }) => ({
        url: `/product-category/subcategory/${categoryId}`,
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Categories", id: "Categories" }],
    }),

    //add-sub-category-items
    addSubCategoryItems: builder.mutation<
      any,
      { subCategoryId: number; body: { name: string } }
    >({
      query: ({ subCategoryId, body }) => ({
        url: `/product-category/subcategory/item/${subCategoryId}`,
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Categories", id: "Categories" }],
    }),

    //edit-category
    editCategory: builder.mutation<
      any,
      { id: number; body: { name: string; description: string } }
    >({
      query: ({ id, body }) => ({
        url: `/product-category/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: [{ type: "Categories", id: "Categories" }],
    }),

    //edit-sub-category
    editSubCategory: builder.mutation<
      any,
      { subCategoryId: number; body: { name: string } }
    >({
      query: ({ subCategoryId, body }) => ({
        url: `/product-category/subcategory/${subCategoryId}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: [{ type: "Categories", id: "Categories" }],
    }),

    //edit-sub-category-items
    editSubCategoryItems: builder.mutation<
      any,
      { subCategoryItemId: number; body: { name: string } }
    >({
      query: ({ subCategoryItemId, body }) => ({
        url: `/product-category/subcategory/items/${subCategoryItemId}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: [{ type: "Categories", id: "Categories" }],
    }),

    //delete-category
    deleteCategory: builder.mutation<any, { id: number }>({
      query: (id) => ({
        url: `/product-category/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: [{ type: "Categories", id: "Categories" }],
    }),

    //delete-sub-category
    deleteSubCategory: builder.mutation<any, { subCategoryId: number }>({
      query: (subCategoryId) => ({
        url: `/product-category/subcategory/${subCategoryId}`,
        method: "DELETE",
      }),

      invalidatesTags: [{ type: "Categories", id: "Categories" }],
    }),

    //delete-sub-category-items
    deleteSubCategoryItems: builder.mutation<
      any,
      { subCategoryItemId: number }
    >({
      query: (subCategoryItemId) => ({
        url: `/product-category/subcategory/items/${subCategoryItemId}`,
        method: "DELETE",
      }),

      invalidatesTags: [{ type: "Categories", id: "Categories" }],
    }),

    //increment product views
    incrementViews: builder.mutation<
      any,
      { userId: number; productId: number }
    >({
      query: ({ userId, productId }) => ({
        url: `/products/view/increment/${userId}/${productId}`,
        method: "PATCH",
      }),

      invalidatesTags: [{ type: "Product", id: "Product" }],
    }),

    //most viewed products
    getAllMostViewedProducts: builder.query<any, any>({
      query: (params) => `/products/sort/highlights?${queryBuilder(params)}`,
      providesTags: [{ type: "Product", id: "Product" }],
    }),
    //visual-products
    getAllvisualProduct: builder.mutation<any, { image: string }>({
      query: (body) => ({
        url: `/products/visual/image`,
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Product", id: "Product" }],
    }),
  }),
});

export const {
  useGetAllvisualProductMutation,
  useAddDeliveryDetailsMutation,
  useAddProductMutation,
  useGetAllProductCategoryQuery,
  useGetAllProductsQuery,
  useGetAllVendorProductsQuery,
  useAddOrderMutation,
  useGetAllOrdersQuery,
  useGetAllOrdersByVendorsQuery,
  useGetProductByIdQuery,
  useAddCategoryMutation,
  useAddSubCategoryMutation,
  useAddSubCategoryItemsMutation,
  useEditCategoryMutation,
  useEditSubCategoryMutation,
  useEditSubCategoryItemsMutation,
  useDeleteCategoryMutation,
  useDeleteSubCategoryMutation,
  useDeleteSubCategoryItemsMutation,
  useDeleteProductMutation,
  useArchiveProductMutation,
  useIncrementViewsMutation,
  useGetAllMostViewedProductsQuery,
  useEditproductMutation,
} = productApi;
