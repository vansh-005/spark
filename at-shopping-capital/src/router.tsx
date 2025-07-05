import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Missions from "./pages/Missions";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/missions", element: <Missions /> },
  { path: "/profile", element: <Profile /> }
]);
