import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import PrivateRoute from "../components/PrivatesRoutes";
import UnprotectedRoutes from "../components/UnprotectedRoutes";
import Loading from "../components/Loading";

const Register = lazy(() => import("../pages/Register"));
const CreateCar = lazy(() => import("../pages/CreateCar"));
const Login = lazy(() => import("../pages/Login"));
const CarDetails = lazy(() => import("../pages/CarDetails"));
const CarList = lazy(() => import("../pages/CarList"));
const UpdateCar = lazy(() => import("../pages/UpdateCar"));

const Route = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <CarList />
        </PrivateRoute>
      ),
    },
    {
      path: "/cars/create",
      element: (
        <PrivateRoute>
          <CreateCar />
        </PrivateRoute>
      ),
    },
    {
      path: "/cars/:id",
      element: (
        <PrivateRoute>
          <CarDetails />
        </PrivateRoute>
      ),
    },
    {
      path: "/cars/update/:id",
      element: (
        <PrivateRoute>
          <UpdateCar />
        </PrivateRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <UnprotectedRoutes>
          <Login />
        </UnprotectedRoutes>
      ),
    },
    {
      path: "/register",
      element: (
        <UnprotectedRoutes>
          <Register />
        </UnprotectedRoutes>
      ),
    },
  ]);

  return <Suspense fallback={<Loading />}>{routes}</Suspense>;
};

export default Route;
