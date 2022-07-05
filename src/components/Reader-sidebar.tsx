import React, { Dispatch, SetStateAction, useState } from "react";
import { GetByURL } from "./GetByUrl";
import { displayType } from "./Reader";

interface Props {
  setShowSettings: Dispatch<SetStateAction<displayType>>;
  addBookmark: () => void;
}
export const ReaderSidebar: React.FC<Props> = ({
  setShowSettings,
  addBookmark,
}) => {
  const [showGetByUrl, setShowGetByUrl] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const buttons = [
    {
      label: "Get by url",
      fn: () => setShowGetByUrl((prev) => !prev),
    },
    {
      label: "Edit",
      fn: () => console.log("b"),
    },
    {
      label: "Bookmarks",
      fn: () =>
        setShowSettings((prev) =>
          prev !== "bookmarks" ? "bookmarks" : "reader"
        ),
    },
    {
      label: "Add bookmark",
      fn: () => addBookmark(),
    },
    {
      label: "Note",
      fn: () => console.log("c"),
    },
    {
      label: "Flash reading",
      fn: () => console.log("a"),
    },
    {
      label: "Settings",
      fn: () =>
        setShowSettings((prev) =>
          prev !== "settings" ? "settings" : "reader"
        ),
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
