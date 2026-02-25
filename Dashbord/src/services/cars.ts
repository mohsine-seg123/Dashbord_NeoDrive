// services/cars.ts
import axios from "axios";
import type { CarsResponse, Car } from "../Interfaces/car";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllCars = () => axios.get<CarsResponse>(`${API_URL}/cars`);

export const getCarById = (id: string) =>
  axios.get<{ data: { car: Car } }>(`${API_URL}/cars/${id}`);

export const createCar = (data: Partial<Car>) =>
  axios.post(`${API_URL}/cars`, data);

export const updateCar = (id: string, data: Partial<Car>) =>
  axios.put(`${API_URL}/cars/${id}`, data);

