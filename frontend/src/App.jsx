import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Booking from "./pages/Booking";

import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Appointments from "./pages/admin/Appointments";
import ManageServices from "./pages/admin/ManageServices";

function Layout() {

    const location = useLocation();

    const isAdmin = location.pathname.startsWith("/admin");

    return (

        <>

            {!isAdmin && <Navbar />}

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/services" element={<Services />} />

                <Route path="/gallery" element={<Gallery />} />

                <Route path="/booking" element={<Booking />} />

                <Route
                    path="/admin"
                    element={<AdminLogin />}
                />

                <Route
                    path="/admin/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/admin/appointments"
                    element={<Appointments />}
                />

                <Route
                    path="/admin/manage-services"
                    element={<ManageServices />}
                />

            </Routes>

            {!isAdmin && <Footer />}

        </>

    );

}

export default function App() {

    return (

        <BrowserRouter>

            <Layout />

        </BrowserRouter>

    );

}