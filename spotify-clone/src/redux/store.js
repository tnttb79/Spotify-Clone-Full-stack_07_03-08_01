import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/playerSlice";
import { shazamCoreAPI } from "./services/shazamCore";
import { shazamCoreAPIv2 } from "./services/shazamCorev2";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    // Add the generated reducer as a specific top-level slice
    [shazamCoreAPI.reducerPath]: shazamCoreAPI.reducer,
    [shazamCoreAPIv2.reducerPath]: shazamCoreAPIv2.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shazamCoreAPI.middleware)
      .concat(shazamCoreAPIv2.middleware),
});
