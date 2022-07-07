import { Action } from "@reduxjs/toolkit";
import { settingSlice } from "./slices/settingSlice";

export const settingsMiddleware =
  (store: any) => (next: any) => (action: Action) => {
    if (settingSlice.actions.update.match(action)) {
      setTimeout(() => {
        localStorage.setItem(
          "EZReaderSettings",
          JSON.stringify(store.getState().settings.value)
        );
      }, 100);
    }
    return next(action);
  };
