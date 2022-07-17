import React, { useEffect, useRef, useState } from "react";
import { useGetVisibleChildren } from "../hooks/useGetVisibleChildren";
import { setArticle } from "../redux/slices/articleSlice";
import { updateBookmark } from "../redux/slices/bookmarksSlice";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks";
import { getTopElement } from "../utils/getTopElement";
import { indexOfElement } from "../utils/indexOfElement";
import { removeClassFromAll } from "../utils/removeClassFromAll";
import { Bookmarks } from "./Bookmarks";
import { Flash } from "./Flash";
import { ReaderSidebar } from "./Reader-sidebar";
import { Settings } from "./Settings";

export type displayType = "reader" | "settings" | "bookmarks" | "flash";

interface Props {}
export const Reader: React.FC<Props> = () => {
  const readerRef = useRef<HTMLDivElement | null>(null);
  const articleRef = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState<displayType>("reader");
  const article = useAppSelector((state) => state.article.value);
  const [redirect, setRedirect] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const filteredTagNames = ["BR", "EM", "DIV"];
  const visibleElements = useGetVisibleChildren(
    articleRef,
    { threshold: 0.3 },
    [article, display]
  ).filter((el) => !filteredTagNames.includes(el.tagName));

  const scrollToLastPos = () => {
    const lastScrollPos = articleRef.current
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
    if (redirect) {
      const el = articleRef.current?.getElementsByTagName("*").item(redirect);
      el?.classList.add("bookmark");
      el?.scrollIntoView();
      setRedirect(null);
    }
  }, [article]);

  useEffect(() => {
    if (display === "reader") {
      scrollToLastPos();
    } else {
      window.scroll(0, 0);
    }
  }, [display]);

  useEffect(() => {
    if (display === "reader") {
      removeClassFromAll("lastscrollpos");
      const el = getTopElement(visibleElements);
      el?.classList.add("lastscrollpos");
    }
  }, [visibleElements]);

  const addBookmark = () => {
    if (display === "reader" && articleRef.current) {
      const el = getTopElement(visibleElements);
      removeClassFromAll("bookmark");
      el.classList.add("bookmark");
      updateArticle();

      dispatch(
        updateBookmark({
          title: article.title,
          url: article.url,
          progress: 10,
          node: indexOfElement(articleRef.current, el),
        })
      );
    }
  };

  const updateArticle = () => {
    if (article && articleRef.current && display === "reader") {
      dispatch(
        setArticle({
          ...article,
          content: String(articleRef.current.innerHTML),
        })
      );
    }
  };

  return (
    <div className="reader-sidebar-wrapper">
      <div className="reader-wrapper" ref={readerRef}>
        {article && display === "reader" && (
          <div
            ref={articleRef}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}
        {display === "settings" && <Settings />}
        {display === "bookmarks" && (
          <Bookmarks setDisplay={setDisplay} setRedirect={setRedirect} />
        )}
        {display === "flash" && <Flash />}
      </div>
      <ReaderSidebar
        setDisplay={setDisplay}
        addBookmark={addBookmark}
        updateArticle={updateArticle}
      />
    </div>
  );
};
