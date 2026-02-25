import { useEffect, useState } from "react";
import type { useDarkModeType } from "../Interfaces/useDarkModeType";


export default function UseDarkMode(): useDarkModeType{
  const [darkMode, setDarkMode] = useState<boolean>(localStorage.getItem("theme") === "dark"? true : false);

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
}
