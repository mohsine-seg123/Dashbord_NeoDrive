import type {JSX} from "react";
import ThreeRevulution from "./statistics/ThreeRevulution";
import CourbRevunue from "./statistics/CourbRevunue";
import CitiesComparaison from "./statistics/CitiesComparaison";
import PieChartDefaultIndex from "./statistics/PieChartDefaultIndex";
import { FunnelChartExample } from "./statistics/FunnelChartExample";

export default function Statistics(): JSX.Element {
   return (
     <div className="w-full h-auto bg-white dark:bg-dark-surface-light min-h-screen">
       <div className="w-full flex flex-col h-auto rounded-lg">
         <div className="flex w-full">
           <div className="flex flex-col p-4 gap-4 w-2/3">
             <ThreeRevulution />
             <CourbRevunue />
           </div>
           <div className="w-1/3 p-4">
             <CitiesComparaison />
           </div>
         </div>

         <div className="flex w-full ">
           <div className="w-1/3 p-4">
             <PieChartDefaultIndex />
           </div>
           <div className="w-2/3 p-4">
             <FunnelChartExample />
           </div>
         </div>

       </div>
     </div>
   );
}