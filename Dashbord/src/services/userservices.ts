
import axios from "../api/axios";

export const getAllUsers = () => {
    return axios.get("users/getAllUsers");
};


export const deleteUser = (id:string) => {
    return axios.delete(`users/deleteUser/${id}`);
};