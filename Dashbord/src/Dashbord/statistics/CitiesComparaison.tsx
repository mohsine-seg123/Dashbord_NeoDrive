import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useContextProvider } from "../../DashbordContext/useContextProvider";

type CityData = {
  name: string;
  massKg: number; // ex: ventes
  fill: string;
};

const data: CityData[] = [
  { name: "Erfoud", massKg: 60, fill: "#6b93d6" },
  { name: "Errachidia", massKg: 20, fill: "#e6b666" },
  { name: "Fes", massKg: 32, fill: "#f97316" },
  { name: "Tanger", massKg: 76, fill: "#6b93d6" },
  { name: "Casa", massKg: 55, fill: "#f97316" },
  { name: "Rissani", massKg: 5, fill: "#e6b666" },
];

export default function CitiesComparaison() {
  const { darkMode } = useContextProvider();
  const colortext: string = darkMode ? "#ffffff" : "#475569";


  return (
    <div className="w-full h-full p-2 bg-surface-avbare dark:bg-dark-bg-secondary rounded-xl">
      <div className="w-full justify-center flex font-sans  dark:text-white text-text-muted">
        Numbers of Sales Cars
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 5, left: 30, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis type="number" />
          <YAxis tick={{ fill: colortext }} type="category" dataKey="name" />
          <Tooltip formatter={(v) => [`${v ?? 0}`, "Sales"]} />

          <Bar dataKey="massKg">
            {data.map((d, i) => (
              <Cell key={i} fill={d.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
