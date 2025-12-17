import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuResponseState {
  menuResponse?: any | undefined;
  landingRoutes?: any[] | undefined;
  authRoutes?: any[] | undefined;
  menuItems?: any[] | undefined;
}

const initialState: MenuResponseState = {
  menuResponse: undefined,
  landingRoutes: undefined,
  authRoutes: undefined,
  menuItems: undefined,
};

const reducer = createSlice({
  name: "menuRouteInfo",
  initialState,
  reducers: {
    setMenuReponse: (state, { payload }: PayloadAction<{ value: any }>) => {
      if (payload) {
        state.menuResponse = payload.value;
        state.authRoutes = payload.value?.route;
        state.menuItems = payload.value?.menu;
      }
    },
    setLandingRoutes: (state, { payload }: PayloadAction<{ value: any[] }>) => {
      if (payload) {
        state.landingRoutes = payload.value;
      }
    },
  },
  extraReducers: () => {},
});

export const {
  reducer: MenuDataReducer,
  actions: { setMenuReponse, setLandingRoutes },
} = reducer;
