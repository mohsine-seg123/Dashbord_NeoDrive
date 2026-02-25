import type {JSX} from "react";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import UseDarkMode from "../../hooks/UseDarkMode";

type RevenuePoint = {
  month: string;
  hybrid: number;
  diesel: number;
  electric: number;
};

const data: RevenuePoint[] = [
  { month: "Jan", hybrid: 360000, diesel: 300000, electric: 250000 },
  { month: "Feb", hybrid: 410000, diesel: 320000, electric: 260000 },
  { month: "Mar", hybrid: 430000, diesel: 315000, electric: 255000 },
  { month: "Apr", hybrid: 405000, diesel: 330000, electric: 275000 },
  { month: "May", hybrid: 400000, diesel: 335000, electric: 290000 },
  { month: "Jun", hybrid: 455000, diesel: 400000, electric: 340000 },
  { month: "Jul", hybrid: 445000, diesel: 375000, electric: 300000 },
  { month: "Aug", hybrid: 560000, diesel: 430000, electric: 355000 },
  { month: "Sep", hybrid: 630000, diesel: 490000, electric: 425000 },
  { month: "Oct", hybrid: 540000, diesel: 515000, electric: 435000 },
  { month: "Nov", hybrid: 545000, diesel: 510000, electric: 440000 },
  { month: "Dec", hybrid: 570000, diesel: 512000, electric: 455000 },
];

export default function CourbRevenue(): JSX.Element {
  const [darkMode] = UseDarkMode();

  const grid = darkMode ? "#334155" : "#e2e8f0";
  const axis = darkMode ? "#cbd5e1" : "#475569";
  const tooltipBg = darkMode ? "#111827" : "#ffffff";
  const tooltipBorder = darkMode ? "#374151" : "#e5e7eb";

  return (
    <div className="w-full h-[320px] rounded-2xl bg-surface-avbare dark:bg-dark-surface border border-black/5 dark:border-dark-border p-4">
      <div className="mb-3 text-sm font-semibold text-text dark:text-dark-text-primary">
        Revenue Evolution (MAD)
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke={grid} strokeDasharray="5 5" />
          <XAxis
            dataKey="month"
            tick={{ fill: axis }}
            axisLine={{ stroke: grid }}
            tickLine={{ stroke: grid }}
          />
          <YAxis
            tick={{ fill: axis }}
            axisLine={{ stroke: grid }}
            tickLine={{ stroke: grid }}
            tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: 12,
              color: axis,
            }}
            labelStyle={{ color: axis }}
            formatter={(value: number, name: string) => [
              `${value.toLocaleString()} MAD`,
              name.charAt(0).toUpperCase() + name.slice(1),
            ]}
          />
          <Legend wrapperStyle={{ color: axis }} />

          <Line
            type="monotone"
            dataKey="hybrid"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="diesel"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="electric"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
