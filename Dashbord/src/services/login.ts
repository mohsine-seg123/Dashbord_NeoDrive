import axios  from "../api/axios";

export const login = (email: string, password: string) => {
  return axios.post("/users/login", { email, password });
};


export const Logout = () => {
  return axios.post("/users/logout");
};

export const getCurrentUser = () => {
  return axios.get("/users/me");
};