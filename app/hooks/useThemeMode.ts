import { useEffect, useState } from "react";

export const useThemeMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleThemeMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.theme = newTheme;
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return { isDarkMode, toggleThemeMode };
};