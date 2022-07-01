import { useState, useEffect } from "react";
import "./App.css";
import { Reader } from "./components/Reader";
import useLocalstorage from "./hooks/useLocalstorage";
import {
  initialSettings,
  ISettings,
  SettingsContext,
} from "./context/SettingsCTX";
import { Article, ArticleContext } from "./context/ArticleCTX";

// TODO: Reading speed dots
// Bookmarks

function App() {
  const [article, setArticle] = useState<Article | null>(null);

  const [settings, setSettings] = useLocalstorage(
    "EZReaderSettings",
    initialSettings
  );
  useEffect(() => {
    let root = document.documentElement;
    settings.map((section: ISettings) =>
      section.settings.map((setting) => {
        if (setting.property) {
          root.style.setProperty(setting.property, String(setting.value));
        }
      })
    );
  }, [settings]);

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
