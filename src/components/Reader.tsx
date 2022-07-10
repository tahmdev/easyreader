import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGetVisibleChildren } from "../hooks/useGetVisibleChildren";
import { setArticle } from "../redux/slices/articleSlice";
import { updateBookmark } from "../redux/slices/bookmarksSlice";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks";
import { Bookmarks } from "./Bookmarks";
import { ReaderSidebar } from "./Reader-sidebar";
import { Settings } from "./Settings";

export type displayType = "reader" | "settings" | "bookmarks";

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
  );

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
      window.scrollTo({ top: 0 });
    }
  }, [display]);

  useEffect(() => {
    if (display === "reader") {
      removeAllOfClass("lastscrollpos");
      const el = getTopElement(
        visibleElements.filter((el) => !filteredTagNames.includes(el.tagName))
      );
      el?.classList.add("lastscrollpos");
    }
  }, [visibleElements]);

  const addBookmark = () => {
    if (display === "reader" && articleRef.current) {
      const el = getTopElement(
        visibleElements.filter((el) => !filteredTagNames.includes(el.tagName))
      );
      removeAllOfClass("bookmark");
      el.classList.add("bookmark");
      updateArticle();

      dispatch(
        updateBookmark({
          title: article.title,
          url: article.url,
          progress: 10,
          node: getIndexOfElement(articleRef.current, el),
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

  const getTopElement = (elementList: Element[]) => {
    elementList.sort(
      (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
    );
    return elementList[0];
  };

  const removeAllOfClass = (className: string) => {
    const elements = document.getElementsByClassName(className);
    for (let el of elements) {
      el.classList.remove(className);
    }
  };

  const getIndexOfElement = (parent: Element, find: Element) => {
    const nodeList = parent.getElementsByTagName("*");
    if (nodeList) {
      const index = Array.prototype.indexOf.call(nodeList, find);
      return index;
    }
    return 0;
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
      </div>
      <ReaderSidebar
        setShowSettings={setDisplay}
        addBookmark={addBookmark}
        updateArticle={updateArticle}
      />
    </div>
  );
};
