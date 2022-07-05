import React, { useContext, useRef, useState } from "react";
import { ArticleContext } from "../context/ArticleCTX";
import { useGetVisibleChildren } from "../hooks/useGetVisibleChildren";
import { ReaderSidebar } from "./Reader-sidebar";
import { Settings } from "./Settings";

export type displayType = "reader" | "settings" | "bookmarks";

interface Props {}
export const Reader: React.FC<Props> = () => {
  const readerRef = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState<displayType>("reader");
  const { article, setArticle } = useContext(ArticleContext);
  const visibleElements = useGetVisibleChildren(readerRef, { threshold: 1 }, [
    article,
  ]);

  const addBookmark = () => {
    readerRef.current
      ?.getElementsByClassName("bookmark")
      .item(0)
      ?.classList.remove("bookmark");
    visibleElements
      .filter((el) => el.tagName !== "BR")
      .sort(
        (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
      )
      .at(-1)
      ?.classList.add("bookmark");
    if (article && readerRef.current) {
      setArticle({ ...article, content: String(readerRef.current.innerHTML) });
    }
  };

  return (
    <div className="reader-sidebar-wrapper">
      <div className="reader-wrapper" ref={readerRef}>
        {article && display === "reader" && (
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        )}
        {display === "settings" && <Settings />}
      </div>
      <ReaderSidebar setShowSettings={setDisplay} addBookmark={addBookmark} />
    </div>
  );
};
