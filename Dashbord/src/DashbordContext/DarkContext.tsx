import { useEffect, useState, type JSX } from "react";
import UseDarkMode from "../hooks/UseDarkMode";
import type { ContextdashbordType } from "../Interfaces/ContextdashbordType";
import { Contextdashbord } from "./Contextdashbord";
import { getAllUsers } from "../services/userservices";
import type { usertype } from "../Interfaces/userType";
import { getCurrentUser } from "../services/login";

export default function ContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [darkMode, setDarkMode] = UseDarkMode();
  const [getAllusers, setAllusers] = useState<usertype[]>([]);
  const [isLogin, setisLogin] = useState<boolean>(false);

  // ✅ bloque le rendu tant que la vérification JWT n'est pas terminée
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const AuthLogin = async () => {
      try {
        const currentuser = await getCurrentUser();
        setisLogin(currentuser.data.status === "success");
      } catch (error) {
        setisLogin(false);
        console.error("Error during authentication check:", error);
      } finally {
        setAuthLoading(false); // ✅ vérification terminée
      }
    };
    AuthLogin();
  }, []);

  useEffect(() => {
    const fetchAllusers = async () => {
      try {
        const res = await getAllUsers();
        setAllusers(res.data.data.allusers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchAllusers();
  }, []);

  const DataContext: ContextdashbordType = {
    darkMode,
    setDarkMode,
    getAllusers,
    setAllusers,
    isLogin,
    setisLogin,
  };

  
  if (authLoading) return null; 

  return (
    <Contextdashbord.Provider value={DataContext}>
      {children}
    </Contextdashbord.Provider>
  );
}
