import { configureStore } from "@reduxjs/toolkit";
import { localStorageMiddleware } from "./middleware";
import { articleReducer } from "./slices/articleSlice";
import { bookmarksReducer } from "./slices/bookmarksSlice";
import { displayReducer } from "./slices/displaySlice";
import { flashReducer } from "./slices/flashSlice";
import settingReducer from "./slices/settingSlice";

export const store = configureStore({
  reducer: {
    settings: settingReducer,
    article: articleReducer,
    bookmarks: bookmarksReducer,
    flash: flashReducer,
    display: displayReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
