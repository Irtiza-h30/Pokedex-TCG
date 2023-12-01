import { ReactNode, useState } from "react";
import ColorThemeContext from "contexts/ColorThemeContext";

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

type Theme = typeof DARK_THEME | typeof LIGHT_THEME;

interface LayoutProps {
  children: ReactNode;
}

// Theme provider used to toggle theme and determine the current mode
const ColorThemeProvider = ({ children }: LayoutProps) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || DARK_THEME
  );

  const onToggle = (checked: boolean) => {
    const value = checked ? DARK_THEME : LIGHT_THEME;

    setTheme(value);
    localStorage.setItem("theme", value);
  };

  return (
    <ColorThemeContext.Provider
      value={{
        onToggle,
        isDarkMode: theme === DARK_THEME,
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
};

export default ColorThemeProvider;
