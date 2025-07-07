import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Missions from "./pages/Missions";
import ProductDetail from "./pages/ProductDetail";
import CategoryProducts from "./pages/CategoryProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "profile", element: <Profile /> },
      { path: "missions", element: <Missions /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "category/:category", element: <CategoryProducts /> },
    ],
  },
]);