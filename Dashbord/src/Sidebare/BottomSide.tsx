import type { JSX } from 'react';
import { MdLogout } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import {Logout} from "../services/login";
import {useContextProvider} from "../DashbordContext/useContextProvider";


export default function BottomSide({ widthSidebar }: { widthSidebar: number }): JSX.Element {
    const {setisLogin}=useContextProvider();
    const Logoutfrom=async ()=>{
          try{
            await Logout();
            setisLogin(false);
        }catch(error){
            console.error("Error during logout:", error);
        }
    };

    return (
      <div
        className={`bottom-0 w-full h-[30%] flex flex-col items-center justify-start ${widthSidebar > 60 ? "gap-2" : "gap-4"} p-2`}
      >
        <div
          className={`flex rounded-lg hover:dark:bg-dark-surface-hover hover:cursor-pointer w-full hover:bg-surface transition-all duration-75 items-center dark:text-white ${widthSidebar > 60 ? "justify-start p-2 gap-2" : "justify-center p-[2px]"}`}
        >
          <CiSettings
            className={` text-blue-700 dark:text-dark-text-primary  text-2xl`}
          />
          <div className="text-[16px] font-semibold font-sans">
            {widthSidebar > 60 ? "Settings" : ""}
          </div>
        </div>
        <div
          className={`flex hover:dark:bg-dark-surface-hover rounded-lg hover:cursor-pointer w-full  hover:bg-surface transition-all duration-200 items-center dark:text-white ${widthSidebar > 60 ? "justify-start p-2 gap-2" : "justify-center p-[2px]"}`}
        >
          <MdLogout
            className={` text-blue-700  dark:text-dark-text-primary text-2xl `}
          />
          <div onClick={()=>Logoutfrom()} className="text-[16px] font-semibold font-sans">
            {widthSidebar > 60 ? "Logout" : ""}
          </div>
        </div>
      </div>
    );
}