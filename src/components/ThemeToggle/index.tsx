import { Switch } from "antd";

import SunIcon from "components/Icons/SunIcon";
import MoonIcon from "components/Icons/MoonIcon";

import { useColorTheme } from "contexts/ColorThemeContext";

// Toggle theme of application between light and dark mode
const ThemeToggle = () => {
  const { isDarkMode, onToggle } = useColorTheme();

  return (
    <Switch
      checkedChildren={<MoonIcon />}
      unCheckedChildren={<SunIcon />}
      checked={isDarkMode}
      onClick={onToggle}
    />
  );
};

export default ThemeToggle;
