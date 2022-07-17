import React, { Dispatch, SetStateAction, useState } from "react";
import { setDisplay } from "../redux/slices/displaySlice";
import { useAppDispatch } from "../redux/typedHooks";
import { GetByURL } from "./GetByUrl";
import { displayType } from "./Reader";

interface Props {
  addBookmark: () => void;
  updateArticle: () => void;
}
export const ReaderSidebar: React.FC<Props> = ({
  addBookmark,
  updateArticle,
}) => {
  const [showGetByUrl, setShowGetByUrl] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const dispatch = useAppDispatch();

  const buttons = [
    {
      label: "Get by url",
      fn: () => setShowGetByUrl((prev) => !prev),
    },
    {
      label: "Bookmarks",
      fn: () => {
        dispatch(setDisplay({ value: "bookmarks" }));
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
        dispatch(setDisplay({ value: "flash" }));
        updateArticle();
      },
    },
    {
      label: "Settings",
      fn: () => {
        dispatch(setDisplay({ value: "settings" }));
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
