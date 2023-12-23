import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AddProduct from "../Pages/AddProduct/AddProduct";
import Cart from "../Pages/Cart/Cart";
import PrivateRoutes from "./PrivateRoutes";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/addProduct',
            element: <PrivateRoutes><AddProduct></AddProduct></PrivateRoutes>
        },
        {
            path: '/cart',
            element: <PrivateRoutes><Cart></Cart></PrivateRoutes>
        },
        {
            path: "/products/:id",
            element: <PrivateRoutes><ProductDetails></ProductDetails></PrivateRoutes>,
            loader: ({ params }) =>
              fetch(`https://wear-hub-server.vercel.app/products/${params.id}`),
          },
      ]
    },
  ]);