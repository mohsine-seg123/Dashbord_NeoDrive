import { createContext } from "react";
import type { ContextdashbordType } from "../Interfaces/ContextdashbordType";

export const Contextdashbord = createContext<ContextdashbordType>({
  darkMode: false,
  setDarkMode: () => {},
  getAllusers: [],
  setAllusers: () => {},
  isLogin: false,
  setisLogin: () => {},
});
