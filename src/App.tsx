import { useEffect } from "react";
import "./App.css";
import { Reader } from "./components/Reader";
import { useAppSelector } from "./redux/typedHooks";
import { ISetting } from "./redux/slices/settingSlice";

// TODO:
// ALLOW EDITING BM TITLES

function App() {
  const settings = useAppSelector((state) => state.settings.value);

  useEffect(() => {
    let root = document.documentElement;
    settings.map((section: ISetting) =>
      section.settings.map((setting) => {
        if (setting.property) {
          switch (setting.label) {
            case "Hide images":
              root.style.setProperty(
                setting.property,
                setting.value ? "none" : "initial"
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
      <Reader />
    </div>
  );
}

export default App;
