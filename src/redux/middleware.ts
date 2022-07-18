import { Action } from "@reduxjs/toolkit";
import { bookmarksSlice } from "./slices/bookmarksSlice";
import { settingSlice } from "./slices/settingSlice";

export const localStorageMiddleware =
  (store: any) => (next: any) => (action: Action) => {
    if (settingSlice.actions.updateSettings.match(action)) {
      setTimeout(
        () =>
          setLocalstorage("EZReaderSettings", store.getState().settings.value),
        0
      );
    } else if (
      bookmarksSlice.actions.updateBookmark.match(action) ||
      bookmarksSlice.actions.deleteBookmark.match(action)
    ) {
      setTimeout(() => {
        setLocalstorage("EZReaderBookmarks", store.getState().bookmarks.value);
      }, 0);
    }
    return next(action);
  };

const debounce = (delay: number = 500, fn: (...args: any) => any) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const setLocalstorage = debounce(800, (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
});
