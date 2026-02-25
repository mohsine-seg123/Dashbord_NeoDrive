import { useState, type JSX } from "react";
import RouteSelect from "./RouteSelect";
import Logo from "./Logo";
import BottomSide from "./BottomSide";
import type { useDarkModeType } from "../Interfaces/useDarkModeType";


export type DarkModeReadOnly = Omit<useDarkModeType, "setDarkMode">;

export default function Sidebare(): JSX.Element {

    const [widthSidebar, setWidthSidebar] = useState<number>(150);
    return (
      <div
        style={{ width: `${widthSidebar}px` }}
        className={` h-[100vh] top-0 gap-4 bg-bg-main border-r-[2px] border-blue-100 dark:border-dark-border-light dark:bg-dark-bg flex flex-col items-center`}
      >
        <Logo widthSidebar={widthSidebar} setWidthSidebar={setWidthSidebar} />
        <RouteSelect widthSidebar={widthSidebar} />
        <BottomSide widthSidebar={widthSidebar} />
      </div>
    );
}