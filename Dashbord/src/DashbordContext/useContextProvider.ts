import { useContext } from "react";
import type { ContextdashbordType } from "../Interfaces/ContextdashbordType";
import { Contextdashbord } from "./Contextdashbord";


export function useContextProvider():ContextdashbordType{
    const contextdata=useContext<ContextdashbordType>(Contextdashbord);
    if(!contextdata){
        throw new Error("useContextProvider must be used within a ContextProvider");
    }
    return contextdata;
}