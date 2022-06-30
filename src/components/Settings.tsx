import React, { useContext, useEffect } from "react";
import { SettingsContext } from "../context/SettingsCTX";

// BG color
// Reader bg color
// Text color
// Link color

// Text size
// Text font
// Line height

// Hide images

// Flash settings:
// Flash speed
// use smart flashing
// keybinds: stop, back, forward
// skip xth word

interface Props {}
export const Settings: React.FC<Props> = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  useEffect(() => {
    console.log(settings);
  }, []);
  return <div className="settings-wrapper">This is settigns</div>;
};
