import React, { Dispatch, SetStateAction, useState } from "react";
import { GetByURL } from "./GetByUrl";
import { displayType } from "./Reader";

interface Props {
  setDisplay: Dispatch<SetStateAction<displayType>>;
  addBookmark: () => void;
  updateArticle: () => void;
}
export const ReaderSidebar: React.FC<Props> = ({
  setDisplay,
  addBookmark,
  updateArticle,
}) => {
  const [showGetByUrl, setShowGetByUrl] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const buttons = [
    {
      label: "Get by url",
      fn: () => setShowGetByUrl((prev) => !prev),
    },
    {
      label: "Bookmarks",
      fn: () => {
        setDisplay((prev) => (prev !== "bookmarks" ? "bookmarks" : "reader"));
        updateArticle();
      },
    },
    {
      label: "Add bookmark",
      fn: () => addBookmark(),
    },
    {
      label: "Flash reading",
      fn: () => {
        setDisplay((prev) => (prev !== "flash" ? "flash" : "reader"));
        updateArticle();
      },
    },
    {
      label: "Settings",
      fn: () => {
        setDisplay((prev) => (prev !== "settings" ? "settings" : "reader"));
        updateArticle();
      },
    },
  ];
  return (
    <div className="sidebar-wrapper">
      <button
        className={`${showSidebar ? "" : "sidebar-toggle-hidden"}`}
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? "▶" : "◀"}
      </button>
      {showSidebar &&
        buttons.map((el) => (
          <button key={el.label} onClick={el.fn}>
            {el.label}
          </button>
        ))}
      {showGetByUrl && <GetByURL hide={() => setShowGetByUrl(false)} />}
    </div>
  );
};
