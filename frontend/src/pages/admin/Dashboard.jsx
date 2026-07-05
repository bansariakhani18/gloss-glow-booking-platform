import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";
export default function Dashboard() {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);

    useEffect(() => {
        loadAppointments();
    }, []);

    async function loadAppointments() {

        try {

            const res = await api.get("/admin/appointments");

            setAppointments(res.data);

        }

        catch (err) {

            console.error(err);

        }

    }

    async function changeStatus(id, status) {

        try {

            await api.put(`/admin/appointments/${id}`, {
                status
            });

            loadAppointments();

        }

        catch (err) {

            console.error(err);

        }

    }
    async function deleteAppointment() {

    try {

        await api.delete(
            `/admin/appointments/${appointmentToDelete}`
        );

        toast.success("Appointment deleted");

        setAppointmentToDelete(null);

        loadAppointments();

    }

    catch (err) {

        toast.error("Couldn't delete appointment");

    }

}



    async function logout() {

        await api.post("/auth/logout");

        navigate("/admin");

    }

    function formatDate(date) {

        return new Date(date).toLocaleDateString("en-IN", {

            day: "numeric",

            month: "short",

            year: "numeric"

        });

    }

    const filteredAppointments = appointments.filter((appointment) => {

        const query = search.toLowerCase();

        return (

            appointment.customer_name.toLowerCase().includes(query) ||

            appointment.customer_phone.includes(query)

        );

    });

    return (

        <section className="min-h-screen bg-[#080808] text-white px-6 lg:px-10 py-14">

            <div className="max-w-7xl mx-auto">

                <div className="mb-12">

    <p className="uppercase tracking-[6px] text-red-600 mb-3">
        Gloss & Glow
    </p>

    <h1 className="text-5xl font-black">
        Dashboard
    </h1>

    <p className="text-zinc-500 mt-3">
        Manage appointments and studio bookings.
    </p>

</div>
<div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">

    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">

        <p className="text-zinc-500 text-sm">
            Pending
        </p>

        <h2 className="text-4xl font-black text-orange-400 mt-2">
            {appointments.filter(a => a.status === "Pending").length}
        </h2>

    </div>

    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">

        <p className="text-zinc-500 text-sm">
            Confirmed
        </p>

        <h2 className="text-4xl font-black text-sky-400 mt-2">
            {appointments.filter(a => a.status === "Confirmed").length}
        </h2>

    </div>

    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">

        <p className="text-zinc-500 text-sm">
            Completed
        </p>

        <h2 className="text-4xl font-black text-green-400 mt-2">
            {appointments.filter(a => a.status === "Completed").length}
        </h2>

    </div>

    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">

        <p className="text-zinc-500 text-sm">
            Today's Bookings
        </p>

        <h2 className="text-4xl font-black text-red-500 mt-2">
            {
                appointments.filter(a =>
                    a.preferred_date ===
                    new Date().toISOString().split("T")[0]
                ).length
            }
        </h2>

    </div>

</div>


               <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">

    <input
        placeholder="Search customer or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 w-full lg:mr-6 bg-zinc-900 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-red-600 transition"
    />

    <div className="flex gap-3 mt-4 lg:mt-0">

        <button
            className="bg-red-600 hover:bg-red-700 transition px-6 py-4 rounded-xl font-semibold"
        >
            + New Appointment
        </button>

        <button
            onClick={logout}
            className="border border-red-600 px-6 py-4 rounded-xl hover:bg-red-600 transition font-semibold"
        >
            Logout
        </button>

    </div>

</div>

                <div className="space-y-6">

                    {filteredAppointments.length === 0 ? (

                        <div className="text-center py-24 text-zinc-500">

                            No appointments found.

                        </div>

                    ) : (

                        filteredAppointments.map((appointment) => (

                            <div

                                key={appointment.id}

                                className="bg-zinc-900 border border-white/10 rounded-3xl p-8 hover:border-red-600/50 transition"

                            >

                                <div className="grid lg:grid-cols-7 gap-8 items-center">

                                    <div>

                                        <p className="text-zinc-500 text-sm mb-1">

                                            Customer

                                        </p>

                                        <h3 className="text-xl font-bold">

                                            {appointment.customer_name}

                                        </h3>

                                    </div>

                                    <div>

                                        <p className="text-zinc-500 text-sm mb-1">

                                            Phone

                                        </p>

                                        <p>

                                            {appointment.customer_phone}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-zinc-500 text-sm mb-1">

                                            Vehicle

                                        </p>

                                        <p>

                                            {appointment.vehicle_model || "-"}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-zinc-500 text-sm mb-1">

                                            Service

                                        </p>

                                        <p className="font-semibold text-red-500">

                                            {appointment.service_type}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-zinc-500 text-sm mb-1">

                                            Date

                                        </p>

                                        <p>

                                            {formatDate(appointment.preferred_date)}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-zinc-500 text-sm mb-1">

                                            Time

                                        </p>

                                        <p>

                                            {appointment.preferred_time}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-zinc-500 text-sm mb-2">
    Change Status
</p>

                                      
                                        <select

                                            value={appointment.status}

                                            onChange={(e) =>
                                                changeStatus(
                                                    appointment.id,
                                                    e.target.value
                                                )
                                            }

                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition"

                                        >

                                            <option value="Pending">

                                                Pending

                                            </option>

                                            <option value="Confirmed">

                                                Confirmed

                                            </option>

                                            <option value="Completed">

                                                Completed

                                            </option>

                                        </select>
                                     

<button
    onClick={() => setAppointmentToDelete(appointment.id)}
    className="mt-3 w-full border border-red-600 text-red-500 rounded-xl py-2 hover:bg-red-600 hover:text-white transition"
>
    Delete
</button>

                                    </div>

                                </div>

                            </div>

                        ))
                        

                    )}

                </div>

            </div>
{appointmentToDelete && (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

    <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 w-[420px]">

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
        </section>

    );

}