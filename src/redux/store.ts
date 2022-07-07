import { configureStore } from "@reduxjs/toolkit";
import { settingsMiddleware } from "./middleware";
import settingReducer from "./slices/settingSlice";

export const store = configureStore({
  reducer: {
    settings: settingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(settingsMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;