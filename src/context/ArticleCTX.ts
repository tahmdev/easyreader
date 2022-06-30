import { createContext, Dispatch, SetStateAction } from "react";

export interface Article {
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

interface IArticleContext {
  article: Article | null;
  setArticle: Dispatch<SetStateAction<Article | null>>;
}

export const ArticleContext = createContext<IArticleContext>(
  {} as IArticleContext
);
