// hooks/useCars.ts
import { useEffect, useState, useMemo } from "react";
import { getAllCars } from "../services/cars";
import type { Car } from "../Interfaces/car";

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    getAllCars()
      .then((res) => setCars(res.data.data.cars))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filtrage + recherche
  const filtered = useMemo(() => {
    return cars.filter((car) => {
      const matchSearch = car.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        categoryFilter === "all" ||
        car.category.toLowerCase() === categoryFilter.toLowerCase();
      return matchSearch && matchCategory;
    });
  }, [cars, search, categoryFilter]);

  // Stats utiles pour le dashboard
  const stats = useMemo(() => ({
    total: cars.length,
    available: cars.filter((c) => c.availability === "Available" || c.availability === "In stock").length,
    soldOut: cars.filter((c) => c.availability === "Sold out").length,
    avgRating: (cars.reduce((sum, c) => sum + c.rating, 0) / cars.length || 0).toFixed(1),
    categories: [...new Set(cars.map((c) => c.category))],
  }), [cars]);

  // Convertit "$48,000" → 48000 pour trier/comparer
  const parsePrice = (price: string) =>
    parseFloat(price.replace(/[$,]/g, ""));

  const sortedByPrice = (order: "asc" | "desc") =>
    [...filtered].sort((a, b) =>
      order === "asc"
        ? parsePrice(a.price) - parsePrice(b.price)
        : parsePrice(b.price) - parsePrice(a.price)
    );

  return {
    cars: filtered,
    loading,
    stats,
    search, setSearch,
    categoryFilter, setCategoryFilter,
    sortedByPrice,
  };
}