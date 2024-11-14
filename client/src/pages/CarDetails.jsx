import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Loading from "../components/Loading";
import { baseUrl } from "../lib/contansts";

const CarDetail = () => {
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/car/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status != 200) {
        throw new Error("Failed to fetch car details");
      }
      setCar(response.data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const handleCarDelete = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/car/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status == 200) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <Loading />;
  if (!car)
    return <div className="text-center mt-8 text-white">Car not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold mb-1">
              {car.company} - {car.car_type}
            </div>
            <h1 className="text-white text-3xl font-bold">{car.title}</h1>
            <p className="mt-2 text-gray-400">{car.description}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-white">Dealer:</h3>
              <p className="text-gray-400">{car.dealer}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {car.tags[0].split(",").map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
              {car.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`${car.title} - Image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
          <div className="px-8 py-4 bg-gray-900 border-t border-gray-800">
            <Link
              to={`/cars/update/${car._id}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2 transition duration-150 ease-in-out"
            >
              Edit Car
            </Link>
            <button
              onClick={() => {
                handleCarDelete(car._id);
              }}
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-150 ease-in-out"
            >
              Delete Car
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
