import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";


export default function ManageServices() {

    const navigate = useNavigate();

    const [services, setServices] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        duration: ""
    });
    const [editingService, setEditingService] = useState(null);
    useEffect(() => {
        loadServices();
    }, []);

    async function loadServices() {

        try {

            const res = await api.get("/admin/services");

            setServices(res.data);

        }

        catch (err) {

            console.error(err);

        }

    }
    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function saveService() {

        try {

            if (editingService) {

                await api.put(
                    `/admin/services/${editingService}`,
                    formData
                );

                toast.success("Service updated");

            } else {

                await api.post(
                    "/admin/services",
                    formData
                );

                toast.success("Service added");

            }

            setShowModal(false);

            setEditingService(null);

            setFormData({
                name: "",
                description: "",
                price: "",
                duration: ""
            });

            loadServices();

        }

        catch (err) {

            toast.error("Couldn't save service");

        }

    }
    async function toggleService(serviceId, active) {

        try {

            await api.delete(`/admin/services/${serviceId}`);

            toast.success(
                active
                    ? "Service deactivated"
                    : "Service activated"
            );

            loadServices();

        }

        catch (err) {

            toast.error("Couldn't update service");

        }

    }
    function editService(service) {

        setEditingService(service.id);

        setFormData({

            name: service.name,

            description: service.description,

            price: service.price,

            duration: service.duration

        });

        setShowModal(true);

    }

    return (

        <section className="min-h-screen bg-[#080808] text-white px-4 sm:px-6 lg:pl-80 lg:pr-10 pt-24 lg:pt-14 pb-16">

            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-12">

                    <div>

                        <button
                            onClick={() => navigate("/admin/dashboard")}
                            className="mb-6 border border-white/10 px-5 py-2 rounded-xl hover:border-red-600 transition"
                        >
                            ← Dashboard
                        </button>

                        <p className="uppercase tracking-[6px] text-red-600 mb-2">
                            Admin
                        </p>

                        <h1 className="text-5xl font-black">
                            Manage Services
                        </h1>

                        <p className="text-zinc-500 mt-3">
                            Add, edit and manage your studio services.
                        </p>

                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-red-600 hover:bg-red-700 px-6 py-4 rounded-xl font-semibold transition"
                    >
                        + Add Service
                    </button>

                </div>

                <div className="space-y-6">

                    {services.map((service) => (

                        <div
                            key={service.id}
                            className="bg-zinc-900 border border-white/10 rounded-3xl p-8 hover:border-red-600/40 transition"
                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        {service.name}
                                    </h2>

                                    <p className="text-zinc-400 mt-3 max-w-xl">
                                        {service.description}
                                    </p>

                                    <div className="flex gap-8 mt-6">

                                        <span className="text-red-500 font-semibold text-lg">
                                            ₹{service.price}
                                        </span>

                                        <span className="text-zinc-500">
                                            {service.duration}
                                        </span>

                                    </div>

                                    <div className="mt-5">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${service.is_active
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-red-500/20 text-red-400"
                                                }`}
                                        >
                                            {service.is_active ? "Active" : "Inactive"}
                                        </span>

                                    </div>

                                </div>

                                <div className="flex gap-3">

                                    <button
                                        onClick={() => editService(service)}
                                        className="border border-white/10 px-5 py-2 rounded-xl hover:border-red-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => toggleService(service.id, service.is_active)}
                                        className={`px-5 py-2 rounded-xl transition ${service.is_active
                                            ? "border border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
                                            : "border border-green-600 text-green-500 hover:bg-green-600 hover:text-white"
                                            }`}
                                    >
                                        {service.is_active ? "Deactivate" : "Activate"}
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
            {showModal && (

                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                    <div className="bg-zinc-900 rounded-3xl p-8 w-[500px]">

                        <h2 className="text-3xl font-black mb-8">

                            {editingService ? "Edit Service" : "Add Service"}

                        </h2>

                        <div className="space-y-5">

                            <input
                                name="name"
                                placeholder="Service Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-black rounded-xl p-4"
                            />

                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-black rounded-xl p-4"
                            />

                            <input
                                name="price"
                                type="number"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full bg-black rounded-xl p-4"
                            />

                            <input
                                name="duration"
                                placeholder="Duration (e.g. 2 Hours)"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full bg-black rounded-xl p-4"
                            />

                        </div>

                        <div className="flex justify-end gap-4 mt-8">

                            <button

                                onClick={() => {

                                    setShowModal(false);

                                    setEditingService(null);

                                    setFormData({
                                        name: "",
                                        description: "",
                                        price: "",
                                        duration: ""
                                    });

                                }}

                                className="border border-white/10 px-6 py-3 rounded-xl"

                            >

                                Cancel

                            </button>

                            <button

                                onClick={saveService}

                                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"

                            >

                                {editingService ? "Update Service" : "Save Service"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </section>

    );

}