import { createContext, useContext } from "react";

interface ColorThemeContextProps {
  onToggle: (checked: boolean) => void;
  isDarkMode: boolean;
}

const ColorThemeContext = createContext<ColorThemeContextProps | undefined>(
  undefined
);

// Utility hook to access ColorThemeContext directly
// eslint-disable-next-line react-refresh/only-export-components
export const useColorTheme = (): ColorThemeContextProps => {
  const context = useContext(ColorThemeContext);

  if (!context) {
    throw new Error(
      "useColorTheme must be used within a ColorThemeContext provider"
    );
  }

  return context;
};

export default ColorThemeContext;
