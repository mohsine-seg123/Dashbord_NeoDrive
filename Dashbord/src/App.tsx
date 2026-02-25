import { BrowserRouter, Route, Routes } from "react-router-dom";

import Statistics from "./Dashbord/Statistics";
import type { JSX } from "react";
import TastksAdmin from "./Dashbord/TasksAdmin";
import UsersManagment from "./Dashbord/UsersManagment";
import ManageContact from "./Dashbord/manageContact";
import Cars from "./Dashbord/cars";
import Login from "./auth/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() :JSX.Element {
  return (
    <main className="min-w-[100vw] min-h-[100vh] m-0 p-0 bg-bg-main flex overflow-hidden ">
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/dashbord" element={<ProtectedRoute />}>
            <Route index element={<Statistics />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="tasks" element={<TastksAdmin />} />
            <Route path="cars" element={<Cars />} />
            <Route path="users" element={<UsersManagment />} />
            <Route path="messages" element={<ManageContact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
