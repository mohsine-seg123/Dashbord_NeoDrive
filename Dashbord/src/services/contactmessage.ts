import axios from "../api/axios";

export const getAllMessages = () => {
    return axios.get("contacts/getAllMessage");
};


export const sendResponse = (id: string, message: string) =>
  axios.post(`/contacts/${id}/reply`, { message });

export const deleteMessage = (id: string) =>
  axios.delete(`/contacts/${id}`);