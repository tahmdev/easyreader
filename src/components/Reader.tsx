import React, { useContext, useState } from "react";
import { ArticleContext } from "../App";
import { ReaderSidebar } from "./Reader-sidebar";
import { Settings } from "./Settings";

interface Props {}
export const Reader: React.FC<Props> = () => {
  const [showSettings, setShowSettings] = useState(false);
  const ctx = useContext(ArticleContext);

  return (
    <div className="reader-sidebar-wrapper">
      <div className="reader-wrapper">
        {ctx?.article && !showSettings && (
          <td dangerouslySetInnerHTML={{ __html: ctx.article.content }} />
        )}
        {showSettings && <Settings />}
      </div>
      <ReaderSidebar setShowSettings={setShowSettings} />
    </div>
  );
};
