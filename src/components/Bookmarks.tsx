import React, { SetStateAction, Dispatch } from "react";
import { setArticle } from "../redux/slices/articleSlice";
import { Bookmark } from "../redux/slices/bookmarksSlice";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks";
import { displayType } from "./Reader";

interface Props {
  setDisplay: Dispatch<SetStateAction<displayType>>;
  setRedirect: Dispatch<SetStateAction<number | null>>;
}
export const Bookmarks: React.FC<Props> = ({ setRedirect, setDisplay }) => {
  const bookmarks = useAppSelector((state) => state.bookmarks.value);
  const dispatch = useAppDispatch();
  const openBookmark = (bookmark: Bookmark) => {
    fetch("http://192.168.178.22:9000/scrape/url/?url=" + bookmark.url)
      .then((res) => res.json())
      .then((json) => dispatch(setArticle(json)));
    setRedirect(bookmark.node);
    setDisplay("reader");
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
