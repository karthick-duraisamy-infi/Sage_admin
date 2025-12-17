
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user?: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
};

const reducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, { payload }: PayloadAction<{ value: boolean; user?: any }>) => {
      state.isAuthenticated = payload.value;
      state.user = payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = undefined;
    },
  },
});

export const {
  reducer: AuthReducer,
  actions: { setAuthenticated, logout },
} = reducer;
