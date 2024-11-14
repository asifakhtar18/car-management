import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../lib/contansts";
import { debounce } from "../lib/utils";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState(cars);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const nav = useNavigate();

  console.log("filteredCars", filteredCars);

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSearch = debounce((searchQuery) => {
    const lowercasedQuery = searchQuery.toLowerCase();

    const results = cars.filter((car) => {
      return (
        car.title.toLowerCase().includes(lowercasedQuery) ||
        car.description.toLowerCase().includes(lowercasedQuery) ||
        car.tags.some((tag) => tag.toLowerCase().includes(lowercasedQuery))
      );
    });

    console.log("results", results);

    setFilteredCars(results);
  }, 200);

  const handleChange = (event) => {
    setSearch(event.target.value);
    handleSearch(event.target.value);
  };

  const fetchCars = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/car`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      const data = await response.json();
      setCars(data);
      setFilteredCars(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  if (isLoading)
    return <div className="text-center mt-8 text-white">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-400">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">My Cars</h1>
        <button
          onClick={() => nav("/cars/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out"
        >
          Add New Car
        </button>
      </div>

      <input
        type="text"
        placeholder="Search cars..."
        value={search}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <Link
            key={car._id}
            to={`/cars/${car._id}`}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src={car.images[0]?.url || "/placeholder.png"}
              alt={car.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-white">
                {car.title}
              </h2>
              <p className="text-gray-400 mb-2">{car.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {car.tags[0]?.split(",")?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CarList;
