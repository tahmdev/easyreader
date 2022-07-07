import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISetting {
  title: string;
  settings: {
    label: string;
    type: string;
    value?: string | number | boolean;
    property?: string;
    checked?: boolean;
    options?: string[];
    suffix?: string;
  }[];
}
interface IPayload {
  label: string;
  value: any;
}

let localSettings = localStorage.getItem("EZReaderSettings");
let initialState: ISetting[];
if (localSettings) {
  initialState = JSON.parse(localSettings);
} else {
  initialState = [
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
          label: "Reader Background Color",
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
        {
          label: "Bookmark color",
          type: "color",
          value: "#76d07c",
          property: "--bookmark-color",
        },
        {
          label: "Reader width",
          type: "number",
          suffix: "px",
          value: 727,
          property: "--reader-width",
        },
      ],
    },
    {
      title: "Text",
      settings: [
        {
          label: "Font",
          type: "select",
          options: [
            "Arial",
            "Arial Black",
            "Comic Sans MS",
            "Courier",
            "Courier New",
            "Garamond",
            "Georgia",
            "Helvetica",
            "Impact",
            "Palatino",
            "Tahoma",
            "Times",
            "Times New Roman",
            "Verdana",
          ],
          value: "Arial",
          property: "--font-family",
        },
        {
          label: "Font size",
          type: "number",
          value: "16",
          suffix: "px",
          property: "--font-size",
        },
        {
          label: "Line height",
          type: "number",
          value: "25",
          suffix: "px",
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
          value: false,
          property: "--hide-images",
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
          value: false,
        },
      ],
    },
  ];
}

export const settingSlice = createSlice({
  name: "settings",
  initialState: {
    value: initialState,
  },
  reducers: {
    update: (state, action: PayloadAction<IPayload>) => {
      const newSettings = state.value.map((section) => {
        return {
          title: section.title,
          settings: section.settings.map((setting) => {
            if (setting.label === action.payload.label) {
              return {
                ...setting,
                value: action.payload.value,
              };
            } else {
              return setting;
            }
          }),
        };
      });
      state.value = newSettings;
    },
  },
});

export const { update } = settingSlice.actions;

export default settingSlice.reducer;
