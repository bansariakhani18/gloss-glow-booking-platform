import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AdminSidebar from "./components/layout/AdminSidebar";
import ScrollToTop from "./components/ScrollToTop";

import { NotificationProvider } from "./context/NotificationContext";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Booking from "./pages/Booking";

import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ManageServices from "./pages/admin/ManageServices";

function Layout() {
    const location = useLocation();

    const isAdminLayout =
        location.pathname.startsWith("/admin/dashboard") ||
        location.pathname.startsWith("/admin/manage-services") ||
        location.pathname.startsWith("/admin/services");

    const isAdminLogin =
        location.pathname === "/admin" ||
        location.pathname === "/admin/login";

    return (
        <>
            {!isAdminLayout && !isAdminLogin && <Navbar />}

            {isAdminLayout && (
                <NotificationProvider>
                    <AdminSidebar />
                </NotificationProvider>
            )}

            <Routes>

                {/* Public */}

                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/booking" element={<Booking />} />

                {/* Admin */}

                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route
                    path="/admin/dashboard"
                    element={
                        <NotificationProvider>
                            <Dashboard />
                        </NotificationProvider>
                    }
                />

                <Route
                    path="/admin/manage-services"
                    element={
                        <NotificationProvider>
                            <ManageServices />
                        </NotificationProvider>
                    }
                />

                <Route
                    path="/admin/services"
                    element={
                        <NotificationProvider>
                            <ManageServices />
                        </NotificationProvider>
                    }
                />

            </Routes>

            {!isAdminLayout && !isAdminLogin && <Footer />}
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Layout />
        </BrowserRouter>
    );
}