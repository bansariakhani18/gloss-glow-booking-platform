import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineCalendar, HiOutlineCog, HiOutlineLogout } from "react-icons/hi";
import api from "../../api/api";
export default function AdminSidebar() {
    const navigate = useNavigate();
    async function handleLogout() {
        try {
            await api.post("/auth/logout");
        } catch (err) {
            // continue logout locally even if request fails
        }
        navigate("/admin");
    }
    const linkStyle = ({ isActive }) =>
        `flex items-center gap-3 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
            isActive
                ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.35)]"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`;
    return (
        <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-black border-r border-white/10 flex-col px-6 py-8 z-40">
            <div className="mb-12">
                <p className="uppercase tracking-[4px] text-red-600 text-xs mb-2">
                    Gloss & Glow
                </p>
                <h2 className="text-white font-black text-xl leading-tight">
                    Admin
                </h2>
            </div>
            <nav className="flex flex-col gap-2 flex-1">
                <NavLink
                    to="/admin/dashboard"
                    end
                    className={linkStyle}
                >
                    <HiOutlineCalendar className="text-xl" />
                    Appointments
                </NavLink>
                <NavLink
                    to="/admin/manage-services"
                    className={linkStyle}
                >
                    <HiOutlineCog className="text-xl" />
                    Services
                </NavLink>
            </nav>
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-5 py-3 rounded-xl font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300 border border-white/10"
            >
                <HiOutlineLogout className="text-xl" />
                Logout
            </button>
        </aside>
    );
}
