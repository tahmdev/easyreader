import React, {
  ChangeEventHandler,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import logo from "./logo.svg";
import "./App.css";
import { parse } from "node:path/win32";
import { json } from "stream/consumers";
import { Reader } from "./components/Reader";
import { ReaderSidebar } from "./components/Reader-sidebar";

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

export const ArticleContext = createContext<{
  article: Article | null;
  setArticle: Dispatch<SetStateAction<Article | null>>;
} | null>(null);

function App() {
  const [article, setArticle] = useState<Article | null>(null);

  return (
    <div className="App">
      <ArticleContext.Provider
        value={{ article: article, setArticle: setArticle }}
      >
        <div className="reader-sidebar-wrapper">
          <Reader />
        </div>
      </ArticleContext.Provider>
    </div>
  );
}

export default App;
