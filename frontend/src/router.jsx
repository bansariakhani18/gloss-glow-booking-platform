import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import ManageServices from "./pages/ManageServices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/services",
    element: <Services />
  },
  {
    path: "/gallery",
    element: <Gallery />
  },
  {
    path: "/booking",
    element: <Booking />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/admin",
    element: <Dashboard />
  },
  {
    path: "/admin/appointments",
    element: <Appointments />
  },
  {
    path: "/admin/services",
    element: <ManageServices />
  }
]);

export default router;