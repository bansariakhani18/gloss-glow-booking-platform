import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/logo/logo.png";

export default function Navbar() {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    const linkStyle = ({ isActive }) =>
        `relative uppercase tracking-[3px] text-sm font-medium transition-all duration-300
        after:absolute after:left-0 after:-bottom-2 after:h-[2px]
        after:bg-red-600 after:transition-all after:duration-300
        ${
            isActive
                ? "text-white after:w-full"
                : "text-zinc-400 hover:text-white after:w-0 hover:after:w-full"
        }`;

    return (

        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-black/75 backdrop-blur-2xl border-b border-white/10"
                    : "bg-transparent"
            }`}
        >

            <div className="max-w-[1450px] mx-auto flex items-center justify-between px-8 py-4">

                <Link
                    to="/"
                    className="flex items-center gap-4 group"
                >

                    <img
                        src={logo}
                        alt="Gloss & Glow"
                        className="w-16 h-16 object-contain transition duration-300 group-hover:scale-105"
                    />

                    <div>

                        <h2 className="text-white font-black text-3xl leading-none">

                            GLOSS
                            <span className="text-red-600"> & GLOW</span>

                        </h2>

                        <p className="text-zinc-500 text-xs uppercase tracking-[4px] mt-2">

                            Premium Auto Detailing Studio

                        </p>

                    </div>

                </Link>

                <nav className="hidden lg:flex items-center gap-12">

                    <NavLink to="/" className={linkStyle}>
                        Home
                    </NavLink>

                    <NavLink to="/services" className={linkStyle}>
                        Services
                    </NavLink>

                    <NavLink to="/gallery" className={linkStyle}>
                        Gallery
                    </NavLink>

                </nav>

                <Link
                    to="/booking?online=true"
                    className="hidden lg:flex items-center justify-center
                    border border-red-600
                    text-white
                    px-8 py-3
                    rounded-full
                    font-semibold
                    transition-all duration-300
                    hover:bg-red-600
                    hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]"
                >

                    Book Now

                </Link>

            </div>

        </header>

    );

}