import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsCTX";

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
              ...setting,
              value: e.target.value,
              checked: e.target.checked,
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
            if (setting.type === "select") {
              return (
                <label key={setting.label}>
                  <span>{setting.label}</span>
                  <select
                    onChange={(e) => handleChange(setting.label, e)}
                    defaultValue={setting.value}
                  >
                    {setting.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }
            return (
              <label key={setting.label}>
                <span>{setting.label}:</span>
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
