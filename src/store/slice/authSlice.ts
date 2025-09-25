import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface GlobalState {
  userInfo: any | undefined;
}

const initialState: GlobalState = {
  userInfo: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { saveUserInfo } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
