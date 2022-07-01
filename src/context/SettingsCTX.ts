import { createContext, Dispatch, SetStateAction } from "react";

interface Isetting {
  label: string;
  type: string;
  value?: string | number;
  property?: string;
  checked?: boolean;
}

export interface ISettings {
  title: string;
  settings: Isetting[];
}

interface ISettingsContext {
  settings: ISettings[];
  setSettings: Dispatch<SetStateAction<ISettings[]>>;
}

export const SettingsContext = createContext<ISettingsContext>(
  {} as ISettingsContext
);

export const initialSettings: ISettings[] = [
  {
    title: "Theme",
    settings: [
      {
        label: "Background Color",
        type: "color",
        value: "#202020",
        property: "--bg-color",
      },
      {
        label: "Reader Background",
        type: "color",
        value: "#202020",
        property: "--reader-color",
      },
      {
        label: "Text color",
        type: "color",
        value: "#FFFFFF",
        property: "--text-color",
      },
      {
        label: "Link color",
        type: "color",
        value: "#B85885",
        property: "--link-color",
      },
    ],
  },
  {
    title: "Text",
    settings: [
      {
        label: "Font",
        type: "select",
        value: "Arial",
        property: "--font-family",
      },
      {
        label: "Font size",
        type: "number",
        value: "16",
        property: "--font-size",
      },
      {
        label: "Line height",
        type: "number",
        value: "27",
        property: "--line-height",
      },
    ],
  },
  {
    title: "Other",
    settings: [
      {
        label: "Hide images",
        type: "checkbox",
        checked: false,
      },
    ],
  },
  {
    title: "Flash",
    settings: [
      {
        label: "Speed",
        type: "number",
        value: 1000,
      },
      {
        label: "Use smart flashing",
        type: "checkbox",
        checked: false,
      },
    ],
  },
];
