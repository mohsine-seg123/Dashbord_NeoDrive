import { FunnelChart, Funnel, Tooltip, LabelList } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import type { JSX } from 'react';
import { useContextProvider } from '../../DashbordContext/useContextProvider';
 


type table={
  name:string,
  value:number,
  fill:string
}

const data: table[] = [
  { value: 90, name: "Visits", fill: "#1D4ED8" },
  { value: 70, name: "Leads", fill: "#16A34A" },
  { value: 55, name: "Tests", fill: "#D97706" },
  { value: 45, name: "Sales", fill: "#7C3AED" },
];


// #endregion
export const FunnelChartExample = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}): JSX.Element => {
   const { darkMode } = useContextProvider();
  return (
  <div className='w-full bg-surface-avbare dark:bg-dark-bg-secondary rounded-xl p-2'>
    <FunnelChart
      style={{ width: "100%", height: "300px", aspectRatio: 1.618 }}
      responsive
      margin={{
        right: 10,
      }}
    >
      <Tooltip />
      <Funnel dataKey="value" data={data} isAnimationActive={isAnimationActive}>
        <LabelList position="right" fill={darkMode ? "#ffffff" : "#000000"} stroke="none" dataKey="name" />
      </Funnel>
      <RechartsDevtools />
    </FunnelChart>
  </div>
);
};

export default FunnelChartExample;
