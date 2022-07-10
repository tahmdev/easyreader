import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Bookmark {
  title: string;
  url: string;
  progress: number;
  node: number;
}

interface IState {
  value: Bookmark[];
}

const localBookmarks = localStorage.getItem("EZReaderBookmarks");
const initialState = { value: [] } as IState;
if (localBookmarks) {
  initialState.value = JSON.parse(localBookmarks);
}

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: initialState,
  reducers: {
    updateBookmark: (state, action: PayloadAction<Bookmark>) => {
      state.value = state.value
        .filter((el) => el.url !== action.payload.url)
        .concat(action.payload);
    },
  },
});

export const { updateBookmark } = bookmarksSlice.actions;
export const bookmarksReducer = bookmarksSlice.reducer;
