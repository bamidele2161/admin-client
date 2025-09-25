import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface GlobalState {
  accountStatus: string;
  searchQuery: string;
  categorySelected: string;
  [key: string]: boolean | number | string;
}

const initialState: GlobalState = {
  accountStatus: "",
  searchQuery: "",
  categorySelected: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,

  reducers: {
    toggleShow: (state, action: PayloadAction<string | number>) => {
      const id = action.payload;
      return {
        ...state,
        [id]: !state[id],
      };
    },
    saveAccountStatus: (state, action) => {
      state.accountStatus = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    saveCategorySelected: (state, action) => {
      state.categorySelected = action.payload;
    },
  },
});

export const {
  toggleShow,
  setSearchQuery,
  saveAccountStatus,
  saveCategorySelected,
} = globalSlice.actions;

export const selectGlobal = (state: RootState) => state.global;
export default globalSlice.reducer;
