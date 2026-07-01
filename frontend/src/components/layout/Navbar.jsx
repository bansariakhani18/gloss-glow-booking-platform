import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        function handleScroll() {
            setScrolled(window.scrollY > 40);
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    const linkStyle = ({ isActive }) =>
    `relative transition-all duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 ${
        isActive
            ? "text-red-500 after:w-full"
            : "text-zinc-300 hover:text-white after:w-0 hover:after:w-full"
    }`;

    return (

        <header
           className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
            scrolled
        ? "bg-black/65 backdrop-blur-2xl border-b border-white/10 shadow-[0_0_40px_rgba(255,0,0,0.08)]"
        : "bg-transparent"
                            }`}
        >

            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

                <Link
                    to="/"
                    className="text-3xl font-black tracking-wide hover:scale-105 transition duration-300"
                >
                    <span className="text-white">GLOSS</span>
                    <span className="text-red-600"> & GLOW</span>
                </Link>

                <nav className="hidden md:flex gap-10 text-sm uppercase tracking-[3px]">

                    <NavLink to="/" className={linkStyle}>
                        Home
                    </NavLink>

                    <NavLink to="/services" className={linkStyle}>
                        Services
                    </NavLink>

                    <NavLink to="/gallery" className={linkStyle}>
                        Gallery
                    </NavLink>

                    <NavLink to="/booking" className={linkStyle}>
                        Booking
                    </NavLink>

                </nav>

                <Link
                    to="/login"
                    className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-full text-white font-semibold"
                >
                    Admin
                </Link>

            </div>

        </header>

    );

}