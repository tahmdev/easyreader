import { createContext, Dispatch, SetStateAction } from "react";

interface ISettings {
  theme: {
    Background: string;
    Reader: string;
    Text: string;
    "Link Color": string;
  };
  text: {
    Font: string;
    "Font size": number;
    "Line height": number;
  };
  other: {
    "Hide images": boolean;
  };
  flash: {
    speed: number;
    "Use smart flashing": boolean;
  };
}

interface ISettingsContext {
  settings: ISettings;
  setSettings: Dispatch<SetStateAction<ISettings>>;
}

export const SettingsContext = createContext<ISettingsContext>(
  {} as ISettingsContext
);
