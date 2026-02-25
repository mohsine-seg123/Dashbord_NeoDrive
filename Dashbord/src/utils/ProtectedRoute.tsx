import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Dashbord/Header';
import Sidebare from '../Sidebare/Sidebare';
import {useContextProvider} from "../DashbordContext/useContextProvider";

function ProtectedRoute(): React.JSX.Element {
    const {isLogin}=useContextProvider();
    return isLogin ? (
      <div className="flex w-screen relative h-screen">
        <Sidebare />

        <div className=" h-full w-[100vw]  bg-surface">
          <Header />
          <div className="h-[calc(100vh-60px)] overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    ) : (
      <Navigate to="/" replace/>
    );
}

export default ProtectedRoute