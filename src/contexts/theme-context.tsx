import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

declare module "@mui/material/styles" {
  interface Palette {
    icon: {
      main: string;
    };
  }
  interface PaletteOptions {
    icon?: {
      main?: string;
    };
  }
}

interface ThemeContextType {
  toggleTheme: () => void;
  setThemeMode: (mode: "light" | "dark") => void;
  themeMode: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const isSystemDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [userPrefersDarkMode, setUserPrefersDarkMode] = useState<
    boolean | null
  >(null);

  const themeMode =
    userPrefersDarkMode !== null
      ? userPrefersDarkMode
        ? "dark"
        : "light"
      : isSystemDarkMode
      ? "dark"
      : "light";

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          icon: {
            main: themeMode === "dark" ? "#ffffff" : "#000000",
          },
        },
      }),
    [themeMode]
  );

  const toggleTheme = () => {
    setUserPrefersDarkMode((prev) =>
      prev === null ? !isSystemDarkMode : !prev
    );
  };

  const setThemeMode = (mode: "light" | "dark") => {
    setUserPrefersDarkMode(mode === "dark");
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, setThemeMode, themeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};
