import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { UserType } from "../../types/userType";

interface userState {
  token: string | null;
  user: UserType | null;
  isAuthenticated: boolean;
}

const initialState: userState = {
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
export const selectToken = (state: RootState): string | null =>
  state.user.token;
export const selectUser = (state: RootState): UserType | null =>
  state.user.user;
export const selectUserRole = (state: RootState): string | null =>
  state.user.user?.role ?? null;

export default userSlice.reducer;
