import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import ManageServices from "./pages/ManageServices";

export default function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/services" element={<Services />} />

                <Route path="/gallery" element={<Gallery />} />

                <Route path="/booking" element={<Booking />} />

                <Route path="/login" element={<Login />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route
                    path="/appointments"
                    element={<Appointments />}
                />

                <Route
                    path="/manage-services"
                    element={<ManageServices />}
                />

            </Routes>

            <Footer />

        </BrowserRouter>
    );
}