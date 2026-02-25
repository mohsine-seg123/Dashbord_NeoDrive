import type { JSX } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { MdMessage } from "react-icons/md";

export default function CourbRevunue(): JSX.Element {
    const Infos = [
      {
        name: "Revenue",
        value: "1,123,000  MAD",
        rate: "+20.4",
        icon1: <FaArrowTrendUp />,
        icon2: <GiTakeMyMoney />,
      },
      {
        name: "Leads",
        value: "3400",
        rate: "+8.4",
        icon1: <FaArrowTrendUp />,
        icon2: <MdMessage />,
      },
      {
        name: "Sales",
        value: "77",
        rate: "+4.4",
        icon1: <FaArrowTrendUp />,
        icon2: <FcSalesPerformance />,
      },
    ];

    return (
      <div className="w-full flex gap-6 h-auto rounded-lg">
        {Infos.map((info, index) => (
          <div
            key={index}
            className="group w-full bg-surface-avbare rounded-2xl border
             p-4 hover:shadow-md transition-all hover:cursor-pointer duration-200 hover:-translate-y-[1px]
             dark:bg-dark-surface dark:border-dark-border"
          >
          
            <div className="flex items-center justify-between">
              <p className="text-lg font-sans text-text-muted dark:text-dark-text-primary">
                {info.name}
              </p>

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center
                    group-hover:bg-primary/10 transition dark:bg-white/10"
              >
                <span className="text-2xl dark:text-white">{info.icon2}</span>
              </div>
            </div>

            {/* Value */}
            <div className="mt-3">
              <div className="ml-2 text-xl font-semibold tracking-tight text-text dark:text-dark-text-primary">
                {info.value}
              </div>

              {/* Rate */}
              <div className="mt-3 flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 text-primary rounded-full px-2.5 py-1 text-xs font-extrabold
                   "
                >
                  {info.icon1}
                  {info.rate}
                </span>

                <span className="text-sm text-text-muted dark:text-dark-text-secondary">
                  vs last month
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    );
}