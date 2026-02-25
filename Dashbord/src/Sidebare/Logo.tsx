import type { JSX } from "react";
import { FaChevronLeft } from "react-icons/fa6";

type Props = {
  widthSidebar: number;
  setWidthSidebar: React.Dispatch<React.SetStateAction<number>>;
};

export default function Logo({
  widthSidebar,
  setWidthSidebar,
}: Props): JSX.Element {
  const collapsedWidth = 60;
  const expandedWidth = 150;

  const collapsed = widthSidebar === collapsedWidth;

  function toggleWidth() {
    setWidthSidebar((prev) =>
      prev === expandedWidth ? collapsedWidth : expandedWidth,
    );
  }

  return (
    <div
      className={`w-full ${collapsed ? "flex-col py-[2px] " : "flex-row py-4"} relative  h-[60px]  flex items-center justify-between px-3 border-b border-stone-300 dark:border-dark-border-light bg-bg-main dark:bg-dark-bg`}
    >
      <div className={`  items-center min-w-0`}>
        {collapsed && (
          <span className="font-semibold hover:cursor-pointer dark:text-dark-text-primary text-[16px] truncate font-sans">
            Neo
          </span>
        )}
        {!collapsed && (
          <span className="font-semibold hover:cursor-pointer text-[16px] dark:text-dark-text-primary truncate font-sans">
            NeoDrive
          </span>
        )}
      </div>

      {/* Toggle */}
      <button
        type="button"
        onClick={toggleWidth}
        className="w-8 h-8 rounded-lg flex items-center justify-center hover:dark:bg-dark-border-light hover:bg-stone-100 active:scale-95 transition"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand" : "Collapse"}
      >
        <FaChevronLeft
          className={`text-lg transition-transform dark:text-dark-text-primary duration-200 ${
            collapsed ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
    </div>
  );
}
 