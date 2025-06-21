import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export const selectToken = (state: RootState) => state.user.token;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
