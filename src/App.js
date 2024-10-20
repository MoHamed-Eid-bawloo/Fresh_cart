import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import ProtectedAuth, { ProtectedLoginAuth } from "./Components/Auth/Auth";
import Products from "./Components/Product/Product";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import ProductsBy from "./Components/ProductsBy/ProductsBy";
import Brands from "./Components/Brands/Brands";
import ProductsByBrand from "./Components/ProductsBy copy/ProductsBy";
import Favproducts from "./Components/FavProducts/Favproducts";
import ProductsDetails from "./Components/ProductDetails/ProductsDetails";
import ResetPass from "./Components/ResetPass/ResetPass";
export default function App() {
  const routes = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          element: <ProtectedAuth />,
          children: [
            { path: "/home", element: <Home /> },
            { path: "/products", element: <Products /> },
            { path: "/productDetails/:id", element: <ProductsDetails /> },
            { path: "/cart", element: <Cart /> },
            { path: "/favs", element: <Favproducts /> },
            { path: "/categories", element: <Categories /> },
            { path: "/brands", element: <Brands /> },
            { path: "/productsBy/:by/:id", element: <ProductsBy /> },
            { path: "/productsByc/:by/:id", element: <ProductsByBrand /> },
          ],
        },
        {
          element: <ProtectedLoginAuth />,
          children: [
            { path: "/Login", element: <Login /> },
            { path: "/Register", element: <Register /> },
            { path: "/resetpass", element: <ResetPass /> },
            { path: "/", element: <Login /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
