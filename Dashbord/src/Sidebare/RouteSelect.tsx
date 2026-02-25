import { MdDashboard, MdMessage } from "react-icons/md";
import { FaTasks, FaCar, FaUsers } from "react-icons/fa";
import type { IconType } from "react-icons";
import { NavLink } from "react-router-dom";
import type { JSX } from "react";

interface RouteIcon {
  icon: IconType;
  title: string;
  path?: string;
}

export default function RouteSelect({
  widthSidebar,
}: {
  widthSidebar: number;
}): JSX.Element {
  const collapsed = widthSidebar === 60;

  const RoutesIcons: RouteIcon[] = [
    { icon: MdDashboard, title: "Statistics", path: "/dashbord/statistics" },
    { icon: FaTasks, title: "Tasks", path: "/dashbord/tasks" },
    { icon: FaCar, title: "Cars", path: "/dashbord/cars" },
    { icon: FaUsers, title: "Users", path: "/dashbord/users" },
    { icon: MdMessage, title: "Messages", path: "/dashbord/messages" },
  ];

  return (
    <div className={`w-full flex h-[500px] flex-col gap-2 p-2 mt-6`}>
      {RoutesIcons.map((route, index) => (
        <NavLink
          key={index}
          to={route.path || "/"}
          className={[
            "flex items-center  p-2 w-full rounded-md cursor-pointer",
            "hover:bg-surface transition-all duration-75",
            "dark:text-white dark:hover:bg-dark-surface-hover",
            collapsed ? "justify-center" : "justify-start gap-5",
          ].join(" ")}
        >
          <route.icon
            className={[
              "text-xl text-blue-700 dark:text-dark-text-primary",
              collapsed ? "mx-auto text-2xl" : "",
            ].join(" ")}
          />

          {!collapsed && <span className="text-sm font-sans font-semibold">{route.title}</span>}
        </NavLink>
      ))}
    </div>
  );
}
