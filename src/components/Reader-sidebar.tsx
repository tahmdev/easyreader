import React, { Dispatch, SetStateAction, useState } from "react";
import { GetByURL } from "./GetByUrl";

interface Props {
  setShowSettings: Dispatch<SetStateAction<false | true>>;
}
export const ReaderSidebar: React.FC<Props> = ({ setShowSettings }) => {
  const [showGetByUrl, setShowGetByUrl] = useState(false);
  const buttons = [
    {
      name: "Get by url",
      fn: () => setShowGetByUrl((prev) => !prev),
    },
    {
      name: "Edit",
      fn: () => console.log("b"),
    },
    {
      name: "Flash reading",
      fn: () => console.log("a"),
    },
    {
      name: "Settings",
      fn: () => setShowSettings((prev) => !prev),
    },
  ];
  return (
    <div className="sidebar-wrapper">
      {buttons.map((el) => (
        <button key={el.name} onClick={el.fn}>
          {el.name}
        </button>
      ))}
      {showGetByUrl && <GetByURL hide={() => setShowGetByUrl(false)} />}
    </div>
  );
};
