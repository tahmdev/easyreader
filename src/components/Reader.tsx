import React, { useContext, useEffect, useRef, useState } from "react";
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
  const visibleElements = useGetVisibleChildren(readerRef, { threshold: 0.3 }, [
    article,
    display,
  ]);

  const scrollToLastPos = () => {
    const lastScrollPos = readerRef.current
      ?.getElementsByClassName("lastscrollpos")
      .item(0);
    lastScrollPos?.scrollIntoView();
  };

  useEffect(() => {
    const observer = new ResizeObserver(scrollToLastPos);
    if (readerRef.current) {
      observer.observe(readerRef.current);
    }
  }, []);

  useEffect(() => {
    scrollToLastPos();
  }, [display]);

  useEffect(() => {
    if (display === "reader") {
      removeAllOfClass("lastscrollpos");
      addClassToTopElement("lastscrollpos");
    }
  }, [visibleElements]);

  const addBookmark = () => {
    if (display === "reader") {
      removeAllOfClass("bookmark");
      addClassToTopElement("bookmark");
      updateArticle();
    }
  };

  const updateArticle = () => {
    if (article && readerRef.current && display === "reader") {
      setArticle({
        ...article,
        content: String(readerRef.current.innerHTML),
      });
    }
  };

  const addClassToTopElement = (className: string) => {
    console.log(visibleElements);
    const filteredTags = ["BR", "EM", "DIV"];
    visibleElements
      .filter((el) => !filteredTags.includes(el.tagName))
      .sort(
        (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
      )[0]
      ?.classList.add(className);
  };

  const removeAllOfClass = (className: string) => {
    const elements = document.getElementsByClassName(className);
    for (let el of elements) {
      el.classList.remove(className);
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
      <ReaderSidebar
        setShowSettings={setDisplay}
        addBookmark={addBookmark}
        updateArticle={updateArticle}
      />
    </div>
  );
};
