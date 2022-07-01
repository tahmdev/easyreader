import React, { useContext, useEffect } from "react";
import { SettingsContext } from "../context/SettingsCTX";

const a: string = "theme";

interface Props {}
export const Settings: React.FC<Props> = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const handleChange = (label: any, e: any) => {
    const newSettings = settings.map((section) => {
      return {
        title: section.title,
        settings: section.settings.map((setting) => {
          if (setting.label === label) {
            return {
              label: setting.label,
              type: setting.type,
              value: e.target.value,
              checked: e.target.checked,
              property: setting.property,
            };
          } else {
            return setting;
          }
        }),
      };
    });
    setSettings(newSettings);
  };

  return (
    <div className="settings-wrapper">
      {settings.map((section) => (
        <div key={section.title}>
          <h2>{section.title}</h2>
          {section.settings.map((setting) => {
            return (
              <label key={setting.label}>
                {setting.label}
                <input
                  type={setting.type}
                  onChange={(e) => handleChange(setting.label, e)}
                  value={setting.value}
                  checked={setting.checked}
                />
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
};
