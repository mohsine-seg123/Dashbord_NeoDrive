import {
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { useContextProvider } from "../../DashbordContext/useContextProvider";

type PieItem = { name: string; value: number; color: string };

const data: PieItem[] = [
  { name: "Electric", value: 10, color: "#3b82f6" }, // blue
  { name: "Diesel", value: 20, color: "#f59e0b" }, // amber
  { name: "Hybrid", value: 70, color: "#22c55e" }, // green
];

export default function FuelTypePie({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  const { darkMode } = useContextProvider();

  const tooltipBg = "#ffffff";
  const tooltipBorder = darkMode ? "#374151" : "#e5e7eb";
  const tooltipText = darkMode ? "#e5e7eb" : "#0f172a";

  return (
    <div className="w-full h-full bg-surface-avbare dark:bg-dark-bg-secondary rounded-xl p-3">
      <div className="mb-2 text-sm font-semibold font-sans text-text dark:text-dark-text-primary">
        Sales by Fuel Type
      </div>

      <div className="w-full h-[260px] ">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              isAnimationActive={isAnimationActive}
            >
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(v: number, name: string) => [`${v}%`, name]}
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: 12,
                color: tooltipText,
              }}
              labelStyle={{ color: tooltipText }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
