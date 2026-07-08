import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import logo from "../../assets/logo/logo.png";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

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
                    ? "bg-black/80 backdrop-blur-2xl border-b border-white/10"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-[1450px] mx-auto flex items-center justify-between px-5 lg:px-8 py-4">

                {/* Logo */}

                <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center gap-3 group"
                >
                    <img
                        src={logo}
                        alt="Gloss & Glow"
                        className="w-12 h-12 lg:w-16 lg:h-16 object-contain transition duration-300 group-hover:scale-105"
                    />

                    <div>
                        <h2 className="text-white font-black text-2xl lg:text-3xl leading-none">
                            GLOSS
                            <span className="text-red-600"> & GLOW</span>
                        </h2>

                        <p className="hidden sm:block text-zinc-500 text-[10px] lg:text-xs uppercase tracking-[4px] mt-2">
                            Premium Auto Detailing Studio
                        </p>
                    </div>
                </Link>

                {/* Desktop Nav */}

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

                {/* Desktop Button */}

                <Link
                    to="/booking?online=true"
                    className="hidden lg:flex items-center justify-center border border-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-red-600 hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]"
                >
                    Book Now
                </Link>

                {/* Mobile Menu Button */}

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden text-white text-3xl"
                >
                    {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                </button>
            </div>

            {/* Mobile Menu */}

            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${
                    menuOpen
                        ? "max-h-96 border-t border-white/10"
                        : "max-h-0"
                }`}
            >
                <div className="bg-black/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-6">

                    <NavLink
                        to="/"
                        onClick={closeMenu}
                        className="uppercase tracking-[3px] text-white"
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/services"
                        onClick={closeMenu}
                        className="uppercase tracking-[3px] text-white"
                    >
                        Services
                    </NavLink>

                    <NavLink
                        to="/gallery"
                        onClick={closeMenu}
                        className="uppercase tracking-[3px] text-white"
                    >
                        Gallery
                    </NavLink>

                    <Link
                        to="/booking?online=true"
                        onClick={closeMenu}
                        className="bg-red-600 hover:bg-red-700 transition rounded-full py-3 text-center font-semibold text-white"
                    >
                        Book Now
                    </Link>

                </div>
            </div>
        </header>
    );
}