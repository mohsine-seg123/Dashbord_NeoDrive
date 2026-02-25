// types/car.ts
export interface CarProperties {
  motor: string;
  range: string;
  acceleration: string;
  autonomy: string;
  batteryCapacity: string;
  fastCharge: string;
  power: string;
  topSpeed: string;
  capacity: string;
  type: string;
}

export interface CarImage {
  id: number;
  src: string;
}

export interface Car {
  _id: string;
  id: number;
  title: string;
  category: string;
  price: string;
  rating: number;
  reviewsCount: number;
  availability:
    | "Available"
    | "In stock"
    | "Pre-order"
    | "Limited availability"
    | "Sold out"
    | "Used / Discontinued";
  description: string;
  properties: CarProperties;
  image: string;
  images: CarImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CarsResponse {
  status: string;
  results: number;
  data: {
    cars: Car[];
  };
}
