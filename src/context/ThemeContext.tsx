// ThemeContext — permanently futuristic dark theme (no toggle)
// This file is kept as a stub to avoid breaking any residual imports.
import { createContext, useContext } from "react";

type Theme = "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Theme is permanently dark — no toggle needed
  return (
    <ThemeContext.Provider value={{ theme: "dark", toggle: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}
