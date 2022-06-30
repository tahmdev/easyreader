import { useState } from "react";
import "./App.css";
import { Reader } from "./components/Reader";
import useLocalstorage from "./hooks/useLocalstorage";
import { SettingsContext } from "./context/SettingsCTX";
import { Article, ArticleContext } from "./context/ArticleCTX";

function App() {
  const [article, setArticle] = useState<Article | null>(null);
  const initialSettings = {
    theme: {
      Background: "#202020",
      Reader: "#202020",
      Text: "#FFF",
      "Link Color": "#B85885",
    },
    text: {
      Font: "Arial",
      "Font size": 16,
      "Line height": 27,
    },
    other: {
      "Hide images": false,
    },
    flash: {
      speed: 1000,
      "Use smart flashing": false,
    },
  };
  const [settings, setSettings] = useLocalstorage(
    "EZReaderSettings",
    initialSettings
  );
  return (
    <div className="App">
      <ArticleContext.Provider value={{ article, setArticle }}>
        <SettingsContext.Provider value={{ settings, setSettings }}>
          <div className="reader-sidebar-wrapper">
            <Reader />
          </div>
        </SettingsContext.Provider>
      </ArticleContext.Provider>
    </div>
  );
}

export default App;
