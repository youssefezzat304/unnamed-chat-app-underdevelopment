"use client";
import {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";

interface ThemeContextType {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<boolean>(false);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
