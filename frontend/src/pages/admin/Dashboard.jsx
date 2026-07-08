import { useEffect, useState, useRef } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import {
    HiOutlineSearch,
    HiOutlinePencilAlt,
    HiOutlineTrash,
    HiOutlineCalendar,
} from "react-icons/hi";
import { useNotifications } from "../../context/NotificationContext";
export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("All");
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);
    const [appointmentToEdit, setAppointmentToEdit] = useState(null);
    const [showNewModal, setShowNewModal] = useState(false);
    const [newForm, setNewForm] = useState({
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        service_type: "",
        preferred_date: "",
        preferred_time: "",
        vehicle_model: "",
        notes: "",
    });
    const [savingNew, setSavingNew] = useState(false);
    const [editForm, setEditForm] = useState({
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        service_type: "",
        preferred_date: "",
        preferred_time: "",
        vehicle_model: "",
        notes: "",
        status: "Pending",
    });
    const [services, setServices] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const knownAppointmentIdsRef = useRef([]);
    const { addNotifications, highlightedAppointmentId } = useNotifications();
    useEffect(() => {
        loadAppointments();
        loadFormOptions();
        const interval = setInterval(() => {
            loadAppointments();
        }, 10000);
        return () => clearInterval(interval);
    }, []);
    async function loadAppointments() {
        try {
            const res = await api.get("/admin/appointments");
            const latest = res.data;
            const previouslyKnown = knownAppointmentIdsRef.current;
            if (previouslyKnown.length > 0) {
                const newlyArrived = latest.filter(
                    (a) => !previouslyKnown.includes(a.id)
                );
                if (newlyArrived.length > 0) {
                    toast.success(
                        `${newlyArrived.length} new appointment${newlyArrived.length > 1 ? "s" : ""} received`
                    );
                    addNotifications(newlyArrived);
                }
            }
            knownAppointmentIdsRef.current = latest.map((a) => a.id);
            setAppointments(latest);
        } catch (err) {
            console.error(err);
        }
    }
    async function loadFormOptions() {
        try {
            const [servicesRes, slotsRes] = await Promise.all([
                api.get("/api/services").catch(() => api.get("/services")),
                api.get("/api/slots").catch(() => api.get("/time-slots")),
            ]);
            const servicesData = Array.isArray(servicesRes.data)
                ? servicesRes.data.filter((s) => s.is_active !== false && s.active !== false)
                : [];
            const slotsData = Array.isArray(slotsRes.data) ? slotsRes.data : [];
            setServices(servicesData);
            setTimeSlots(slotsData);
        } catch (err) {
            console.error(err);
        }
    }
    async function changeStatus(id, status) {
        try {
            await api.put(`/admin/appointments/${id}`, { status });
            loadAppointments();
        } catch (err) {
            console.error(err);
        }
    }
    async function deleteAppointment() {
        try {
            await api.delete(`/admin/appointments/${appointmentToDelete}`);
            toast.success("Appointment deleted");
            setAppointmentToDelete(null);
            loadAppointments();
        } catch (err) {
            toast.error("Couldn't delete appointment");
        }
    }
    function openEditModal(appointment) {
        setAppointmentToEdit(appointment.id);
        setEditForm({
            customer_name: appointment.customer_name || "",
            customer_phone: appointment.customer_phone || "",
            customer_email: appointment.customer_email || "",
            service_type: appointment.service_type || "",
            preferred_date: appointment.preferred_date || "",
            preferred_time: appointment.preferred_time || "",
            vehicle_model: appointment.vehicle_model || appointment.vehicle || "",
            notes: appointment.notes || "",
            status: appointment.status || "Pending",
        });
    }
    function closeEditModal() {
        setAppointmentToEdit(null);
    }
    function openNewModal() {
        setNewForm({
            customer_name: "",
            customer_phone: "",
            customer_email: "",
            service_type: "",
            preferred_date: "",
            preferred_time: "",
            vehicle_model: "",
            notes: "",
        });
        setShowNewModal(true);
    }
    function closeNewModal() {
        setShowNewModal(false);
    }
    function handleNewChange(e) {
        const { name, value } = e.target;
        if (name === "customer_phone") {
            const phone = value.replace(/\D/g, "").slice(0, 10);
            setNewForm((prev) => ({ ...prev, customer_phone: phone }));
            return;
        }
        setNewForm((prev) => ({ ...prev, [name]: value }));
    }
    function handleEditField(e) {
        const { name, value } = e.target;
        if (name === "customer_phone") {
            const phone = value.replace(/\D/g, "").slice(0, 10);
            setEditForm((prev) => ({ ...prev, customer_phone: phone }));
            return;
        }
        setEditForm((prev) => ({ ...prev, [name]: value }));
    }
    async function saveNewAppointment(e) {
        e.preventDefault();
        setSavingNew(true);

        try {
            await api.post("/appointments", newForm);

            toast.success("Appointment created");
            closeNewModal();
            loadAppointments();

        } catch (err) {

            toast.error(
                err.response?.data?.message || "Couldn't create appointment"
            );

        } finally {

            setSavingNew(false);

        }
    }
    function handleEditChange(field, value) {
        setEditForm((prev) => ({ ...prev, [field]: value }));
    }
    const todayIso = new Date().toISOString().split("T")[0];
    async function saveEdit() {
        try {
            await api.put(`/admin/appointments/${appointmentToEdit}`, {
                ...editForm,
                status: editForm.status || "Pending",
            });
            toast.success("Appointment updated");
            closeEditModal();
            loadAppointments();
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Couldn't update appointment"
            );
        }
    }
    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }
    function formatDateTime(value) {
        if (!value) return "-";
        return new Date(value).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    }
    const counts = {
        All: appointments.length,
        Pending: appointments.filter((a) => a.status === "Pending").length,
        Confirmed: appointments.filter((a) => a.status === "Confirmed").length,
        Completed: appointments.filter((a) => a.status === "Completed").length,
        Cancelled: appointments.filter((a) => a.status === "Cancelled").length,
    };
    const tabs = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];
    const tabStyles = {
        All: "border-white/30 text-white",
        Pending: "border-orange-400/60 text-orange-400",
        Confirmed: "border-sky-400/60 text-sky-400",
        Completed: "border-green-400/60 text-green-400",
        Cancelled: "border-red-500/60 text-red-500",
    };
    const statusBadgeStyles = {
        Pending: "bg-orange-400/10 text-orange-400 border-orange-400/30",
        Confirmed: "bg-sky-400/10 text-sky-400 border-sky-400/30",
        Completed: "bg-green-400/10 text-green-400 border-green-400/30",
        Cancelled: "bg-red-500/10 text-red-500 border-red-500/30",
    };
    const filteredAppointments = appointments.filter((appointment) => {
        const query = search.toLowerCase();
        const matchesStatus =
            activeTab === "All" || appointment.status === activeTab;
        const matchesSearch =
            appointment.customer_name.toLowerCase().includes(query) ||
            appointment.customer_phone.includes(query);
        return matchesStatus && matchesSearch;
    });
    return (
        <section className="min-h-screen bg-[#080808] text-white px-4 sm:px-6 lg:pl-80 lg:pr-10 pt-24 lg:pt-14 pb-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
                    <div>
                        <p className="uppercase tracking-[6px] text-red-600 text-xs mb-3 flex items-center gap-2">
                            <HiOutlineCalendar />
                            Dashboard
                        </p>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
                            Appointments
                        </h1>
                        <p className="text-zinc-500 mt-3 text-sm sm:text-base">
                            Manage and track customer appointments.
                        </p>
                    </div>
                    <button
                        onClick={openNewModal}
                        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold transition whitespace-nowrap self-start lg:self-end"
                    >
                        + New Appointment
                    </button>
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-6 sm:mb-8">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2.5 rounded-xl font-semibold text-sm border transition-all duration-300 ${activeTab === tab
                                    ? tabStyles[tab] + " bg-white/5"
                                    : "border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
                                    }`}
                            >
                                {tab}
                                <span
                                    className={`ml-2 text-xs ${activeTab === tab ? "" : "text-zinc-500"
                                        }`}
                                >
                                    ({counts[tab]})
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full lg:w-80">
                        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                            placeholder="Search customer or phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-11 pr-5 py-3 outline-none focus:border-red-600 transition"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    {filteredAppointments.length === 0 ? (
                        <div className="text-center py-20 sm:py-24 text-zinc-500 border border-white/10 rounded-2xl bg-zinc-900/50">
                            No appointments found.
                        </div>
                    ) : (
                        filteredAppointments.map((appointment) => {
                            const isHighlighted =
                                highlightedAppointmentId === appointment.id;
                            return (
                                <div
                                    key={appointment.id}
                                    id={`appointment-${appointment.id}`}
                                    className={`rounded-2xl p-5 sm:p-6 transition-all duration-500 border bg-zinc-900 ${isHighlighted
                                        ? "border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.5)] bg-red-950/20"
                                        : "border-white/10"
                                        }`}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                                        <div className="lg:col-span-3">
                                            <h3 className="text-lg sm:text-xl font-black text-white break-words">
                                                {appointment.customer_name}
                                            </h3>
                                            <span
                                                className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full border ${statusBadgeStyles[appointment.status] ||
                                                    "border-white/10 text-zinc-400"
                                                    }`}
                                            >
                                                {appointment.status}
                                            </span>
                                            <p className="mt-3 text-red-500 font-semibold break-words">
                                                {appointment.service_type}
                                            </p>
                                        </div>
                                        <div className="lg:col-span-3 grid grid-cols-3 gap-3 sm:gap-4">
                                            <div>
                                                <p className="text-zinc-500 text-[10px] sm:text-xs uppercase tracking-wider mb-1">
                                                    Date
                                                </p>
                                                <p className="text-white font-semibold text-sm">
                                                    {formatDate(appointment.preferred_date)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-zinc-500 text-[10px] sm:text-xs uppercase tracking-wider mb-1">
                                                    Time
                                                </p>
                                                <p className="text-white font-semibold text-sm">
                                                    {appointment.preferred_time || "-"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-zinc-500 text-[10px] sm:text-xs uppercase tracking-wider mb-1">
                                                    Vehicle
                                                </p>
                                                <p className="text-white font-semibold text-sm break-words">
                                                    {appointment.vehicle_model || appointment.vehicle || "-"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="lg:col-span-3 space-y-3">
                                            <div>
                                                <p className="text-zinc-500 text-[10px] sm:text-xs uppercase tracking-wider mb-1">
                                                    Phone
                                                </p>
                                                <p className="text-white text-sm break-words">
                                                    {appointment.customer_phone}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-zinc-500 text-[10px] sm:text-xs uppercase tracking-wider mb-1">
                                                    Email
                                                </p>
                                                <p className="text-white text-sm break-all">
                                                    {appointment.customer_email || "-"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-zinc-500 text-[10px] sm:text-xs uppercase tracking-wider mb-1">
                                                    Notes
                                                </p>
                                                <p className="text-zinc-300 text-sm line-clamp-2">
                                                    {appointment.notes || "-"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="lg:col-span-3 flex flex-col gap-2">
                                            <select
                                                value={appointment.status}
                                                onChange={(e) =>
                                                    changeStatus(
                                                        appointment.id,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-red-600 transition text-sm"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    onClick={() => openEditModal(appointment)}
                                                    className="flex items-center justify-center gap-1.5 border border-white/10 text-white rounded-xl py-2.5 hover:border-red-600 hover:text-red-500 transition text-sm font-semibold"
                                                >
                                                    <HiOutlinePencilAlt />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => setAppointmentToDelete(appointment.id)}
                                                    className="flex items-center justify-center gap-1.5 border border-red-600 text-red-500 rounded-xl py-2.5 hover:bg-red-600 hover:text-white transition text-sm font-semibold"
                                                >
                                                    <HiOutlineTrash />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 pt-4 border-t border-white/5 text-xs text-zinc-500 break-words">
                                        Received: {formatDateTime(appointment.created_at || appointment.preferred_date)}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            {appointmentToDelete && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 w-full max-w-md">
                        <h2 className="text-2xl font-black mb-4">
                            Delete Appointment?
                        </h2>
                        <p className="text-zinc-400 mb-8">
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setAppointmentToDelete(null)}
                                className="px-6 py-3 rounded-xl border border-white/10"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteAppointment}
                                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {appointmentToEdit && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black">
                                Edit Appointment
                            </h2>
                            <button
                                onClick={closeEditModal}
                                className="text-zinc-400 hover:text-white transition text-2xl"
                                type="button"
                            >
                                &times;
                            </button>
                        </div>
                        <form onSubmit={saveEdit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="customer_name"
                                        placeholder="e.g. Rohan Sharma"
                                        value={editForm.customer_name}
                                        onChange={handleEditField}
                                        required
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="customer_phone"
                                        placeholder="10-digit mobile number"
                                        value={editForm.customer_phone}
                                        onChange={handleEditField}
                                        required
                                        pattern="[6-9]{1}[0-9]{9}"
                                        maxLength={10}
                                        title="Enter a valid 10-digit Indian mobile number"
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Email <span className="text-zinc-600">(Optional)</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="customer_email"
                                        placeholder="name@example.com"
                                        value={editForm.customer_email}
                                        onChange={handleEditField}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Service
                                    </label>
                                    <select
                                        name="service_type"
                                        value={editForm.service_type}
                                        onChange={handleEditField}
                                        required
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    >
                                        <option value="">Select Service</option>
                                        {services.map((service) => (
                                            <option
                                                key={service.id}
                                                value={service.name}
                                            >
                                                {service.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="preferred_date"
                                        value={editForm.preferred_date}
                                        onChange={handleEditField}
                                        min={todayIso}
                                        required
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Time
                                    </label>
                                    <select
                                        name="preferred_time"
                                        value={editForm.preferred_time}
                                        onChange={handleEditField}
                                        required
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    >
                                        <option value="">Select Time</option>
                                        {timeSlots.map((slot) => (
                                            <option key={slot} value={slot}>
                                                {slot}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Vehicle
                                    </label>
                                    <input
                                        type="text"
                                        name="vehicle_model"
                                        placeholder="e.g. Hyundai Creta"
                                        value={editForm.vehicle_model}
                                        onChange={handleEditField}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Notes
                                    </label>
                                    <textarea
                                        name="notes"
                                        rows="3"
                                        value={editForm.notes}
                                        onChange={handleEditField}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition resize-none"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/30 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-xl font-semibold transition bg-red-600 hover:bg-red-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showNewModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black">
                                New Appointment
                            </h2>
                            <button
                                onClick={closeNewModal}
                                className="text-zinc-400 hover:text-white transition text-2xl"
                                type="button"
                            >
                                &times;
                            </button>
                        </div>
                        <form onSubmit={saveNewAppointment} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Customer Name
                                    </label>
                                    <input
                                        type="text"
                                        name="customer_name"
                                        value={newForm.customer_name}
                                        onChange={handleNewChange}
                                        required
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="customer_phone"
                                        value={newForm.customer_phone}
                                        onChange={handleNewChange}
                                        required
                                        pattern="[6-9]{1}[0-9]{9}"
                                        maxLength={10}
                                        title="Enter a valid 10-digit Indian mobile number"
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Email (Optional)
                                    </label>
                                    <input
                                        type="email"
                                        name="customer_email"
                                        value={newForm.customer_email}
                                        onChange={handleNewChange}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Service
                                    </label>
                                    <select
                                        name="service_type"
                                        value={newForm.service_type}
                                        onChange={handleNewChange}
                                        required
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    >
                                        <option value="">Select Service</option>
                                        {services.map((service) => (
                                            <option
                                                key={service.id}
                                                value={service.name}
                                            >
                                                {service.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="preferred_date"
                                        value={newForm.preferred_date}
                                        onChange={handleNewChange}
                                        min={todayIso}
                                        required
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Time
                                    </label>
                                    <select
                                        name="preferred_time"
                                        value={newForm.preferred_time}
                                        onChange={handleNewChange}
                                        required
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    >
                                        <option value="">Select Time</option>
                                        {timeSlots.map((slot) => (
                                            <option key={slot} value={slot}>
                                                {slot}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Vehicle (e.g. Hyundai Creta)
                                    </label>
                                    <input
                                        type="text"
                                        name="vehicle_model"
                                        value={newForm.vehicle_model}
                                        onChange={handleNewChange}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-zinc-500 text-sm mb-1 block">
                                        Notes
                                    </label>
                                    <textarea
                                        name="notes"
                                        rows="3"
                                        value={newForm.notes}
                                        onChange={handleNewChange}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition resize-none"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={closeNewModal}
                                    className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/30 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={savingNew}
                                    className={`px-6 py-3 rounded-xl font-semibold transition ${savingNew
                                        ? "bg-red-500 cursor-not-allowed opacity-70"
                                        : "bg-red-600 hover:bg-red-700"
                                        }`}
                                >
                                    {savingNew ? "Saving..." : "Save Appointment"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
