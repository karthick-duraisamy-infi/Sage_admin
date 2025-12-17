import { configureStore } from "@reduxjs/toolkit";
import { CommonService, LocalService } from "@/service/service";
import { MenuDataReducer } from "./menu.store";
import { AuthReducer } from "./auth.store";

export const store = configureStore({
  reducer: {
    MenuDataReducer,
    AuthReducer,
    [CommonService.reducerPath]: CommonService.reducer,
    [LocalService.reducerPath]: LocalService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      CommonService.middleware,
      LocalService.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;