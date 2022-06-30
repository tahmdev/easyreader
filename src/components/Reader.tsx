import React, { useContext, useState } from "react";
import { ArticleContext } from "../context/ArticleCTX";
import { ReaderSidebar } from "./Reader-sidebar";
import { Settings } from "./Settings";

interface Props {}
export const Reader: React.FC<Props> = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { article } = useContext(ArticleContext);

  return (
    <div className="reader-sidebar-wrapper">
      <div className="reader-wrapper">
        {article && !showSettings && (
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        )}
        {showSettings && <Settings />}
      </div>
      <ReaderSidebar setShowSettings={setShowSettings} />
    </div>
  );
};
