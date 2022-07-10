import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Article {
  author: string;
  content: string;
  description: string;
  image: string;
  links: string[];
  published: string;
  source: string;
  title: string;
  ttr: number;
  url: string;
}

interface IState {
  value: Article;
}

const initialState = {} as IState;

export const articleSlice = createSlice({
  name: "article",
  initialState: initialState,
  reducers: {
    setArticle: (state, action: PayloadAction<Article>) => {
      state.value = action.payload;
    },
  },
});

export const { setArticle } = articleSlice.actions;
export const articleReducer = articleSlice.reducer;
