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

// TODO:
// GET FULL INSIDE TEXT FOR FLASH READING AND POTENTIALLY FOCUS HELP
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
          switch (setting.label) {
            case "Hide images":
              root.style.setProperty(
                setting.property,
                setting.checked ? "none" : "initial"
              );
              break;
            default:
              root.style.setProperty(
                setting.property,
                String(
                  setting.suffix
                    ? setting.value + setting.suffix
                    : setting.value
                )
              );
          }
        }
      })
    );
  }, [settings]);

  return (
    <div className="App">
      <ArticleContext.Provider value={{ article, setArticle }}>
        <SettingsContext.Provider value={{ settings, setSettings }}>
          <Reader />
        </SettingsContext.Provider>
      </ArticleContext.Provider>
    </div>
  );
}

export default App;
