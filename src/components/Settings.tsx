import React from "react";
import { updateSettings } from "../redux/slices/settingSlice";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks";

interface Props {}
export const Settings: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.value);

  const handleChange = (type: string, label: string, e: any) => {
    let value;
    switch (type) {
      case "checkbox":
        value = e.target.checked;
        break;
      default:
        value = e.target.value;
    }
    dispatch(updateSettings({ label: label, value: value }));
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
                    onChange={(e) =>
                      handleChange(setting.type, setting.label, e)
                    }
                    defaultValue={String(setting.value)}
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
                  onChange={(e) => handleChange(setting.type, setting.label, e)}
                  value={String(setting.value)}
                  checked={Boolean(setting.value)}
                />
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
};
