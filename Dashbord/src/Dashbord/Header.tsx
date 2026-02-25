import { FiSearch, FiSun, FiBell, FiUser } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import { FiMoon } from "react-icons/fi";
import { useContextProvider } from "../DashbordContext/useContextProvider";
import { useCallback } from "react";

function formatFRDate(d: Date) {
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function Header() {
  const { darkMode, setDarkMode } = useContextProvider();
 const toggleDarkMode = useCallback(
   () => setDarkMode(!darkMode),
   [darkMode, setDarkMode],
 );

  return (
   <header className="w-full h-[60px] px-5 bg-surface-avbare dark:bg-dark-surface font-sans text-text dark:text-dark-text-primary flex items-center justify-between border-b border-black/5 dark:border-dark-border">
  <div className="relative w-[380px] hover:cursor-pointer">
    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-dark-text-secondary" />
    <input
      type="text"
      placeholder="Rechercher..."
      className="w-full h-11 pl-10 pr-4 rounded-2xl bg-white/70 dark:bg-dark-surface-light border border-black/10 dark:border-dark-border-light
                 placeholder:text-text-muted dark:placeholder:text-dark-text-muted outline-none
                 focus:border-primary dark:focus:border-dark-primary transition-all duration-200"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-text-muted dark:text-dark-text-secondary bg-black/5 dark:bg-white/10 px-2 py-1 rounded-lg">
      ⌘ K
    </span>
  </div>

  <div className="flex items-center gap-2">
    <div className="h-11 px-4 rounded-2xl hover:cursor-pointer bg-white/70 dark:bg-dark-surface-light border border-black/10 dark:border-dark-border-light flex items-center gap-2 text-sm">
      <FaCalendarAlt className="text-text-muted dark:text-dark-text-secondary text-[15px]" />
      <span className="font-medium">{formatFRDate(new Date())}</span>
    </div>

    <button
      onClick={toggleDarkMode}
      className="w-11 h-11 rounded-2xl bg-white/70 dark:bg-dark-surface-light border border-black/10 dark:border-dark-border-light hover:bg-white dark:hover:bg-dark-surface-hover transition flex items-center justify-center"
    >
      {!darkMode ? <FiSun className="text-[19px]" /> : <FiMoon className="text-[19px]" />}
    </button>

    <button className="relative w-11 h-11 rounded-2xl bg-white/70 dark:bg-dark-surface-light border border-black/10 dark:border-dark-border-light hover:bg-white dark:hover:bg-dark-surface-hover transition flex items-center justify-center">
      <FiBell className="text-[19px]" />
      <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-[11px] text-white flex items-center justify-center">
        8
      </span>
    </button>

    <button className="w-11 h-11 rounded-2xl bg-white/70 dark:bg-dark-surface-light border border-black/10 dark:border-dark-border-light hover:bg-white dark:hover:bg-dark-surface-hover transition flex items-center justify-center">
      <FiUser className="text-[19px]" />
    </button>
  </div>
</header>
  );
}