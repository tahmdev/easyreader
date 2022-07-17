import React, { SetStateAction, Dispatch } from "react";
import { setArticle } from "../redux/slices/articleSlice";
import { Bookmark } from "../redux/slices/bookmarksSlice";
import { setDisplay } from "../redux/slices/displaySlice";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks";

interface Props {
  setRedirect: Dispatch<SetStateAction<number | null>>;
}
export const Bookmarks: React.FC<Props> = ({ setRedirect }) => {
  const bookmarks = useAppSelector((state) => state.bookmarks.value);
  const dispatch = useAppDispatch();
  const openBookmark = (bookmark: Bookmark) => {
    fetch("http://192.168.178.22:9000/scrape/url/?url=" + bookmark.url)
      .then((res) => res.json())
      .then((json) => dispatch(setArticle(json)));
    setRedirect(bookmark.node);
    dispatch(setDisplay({ value: "reader" }));
  };
  return (
    <div className="bookmarks-wrapper">
      <h1>Bookmarks</h1>
      {[...bookmarks].reverse().map((el) => (
        <div key={el.url} className="bookmark-container">
          <h2> {el.title} </h2>
          <a href={el.url}> {el.url} </a>
          <button onClick={() => openBookmark(el)}>Open</button>
        </div>
      ))}
    </div>
  );
};
