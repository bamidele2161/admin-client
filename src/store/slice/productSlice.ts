import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
  vendorId: number;
}

interface ProductState {
  cart: Product[];
  wishlist: number[];
  currentShoppingStep: number;
  totalAmount: any;
}

const initialState: ProductState = {
  cart: [],
  wishlist: [],
  currentShoppingStep: 1,
  totalAmount: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cart?.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
        toast.success("Product added to cart successfully");
      } else {
        state.cart?.push({ ...action.payload });
        toast.success("Product added to cart successfully");
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart?.filter((item) => item.id !== action.payload);
    },
    addToWishlist: (state, action) => {
      if (!state.wishlist?.includes(action.payload)) {
        state.wishlist?.push(action.payload);
      } else {
        toast.error("Product already added to wishlist");
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((id) => id !== action.payload);
    },
    clearWishItems: (state) => {
      state.wishlist = [];
    },
    setCurrentShoppingStep: (state, action) => {
      state.currentShoppingStep = action.payload;
    },

    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },

    clearCartItems: (state) => {
      state.cart = [];
    },
    incrementQuantity: (state, action) => {
      const product = state.cart?.find((item) => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const product = state.cart?.find((item) => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  incrementQuantity,
  decrementQuantity,
  setCurrentShoppingStep,
  setTotalAmount,
  clearCartItems,
  clearWishItems,
} = productSlice.actions;

export const selectProduct = (state: RootState) => state.product;
export default productSlice.reducer;
