import { useEffect, useState } from "react";
import api from "../api/api";
import { motion } from "motion/react";

export default function Services() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchServices() {

            try {

                const res = await api.get("/services");
                setServices(res.data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        }

        fetchServices();

    }, []);

    return (

        <section className="min-h-screen bg-[#090909] text-white px-8 py-28">

            <div className="max-w-7xl mx-auto">

                <p className="uppercase tracking-[6px] text-red-500 mb-3">
                    Premium Services
                </p>

                <h1 className="text-5xl font-black mb-16">
                    Our Services
                </h1>

                {loading ? (

                    <p className="text-zinc-400">
                        Loading...
                    </p>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {services.map((service) => (

                            <motion.div
                                key={service.id}
                                whileHover={{ y: -8 }}
                                className="bg-zinc-900 border border-white/10 rounded-3xl p-8"
                            >

                                <h2 className="text-2xl font-bold">
                                    {service.name}
                                </h2>

                                <p className="text-zinc-400 mt-4">
                                    {service.description}
                                </p>

                                <div className="mt-8 flex justify-between">

                                    <span className="text-red-500 font-bold text-xl">
                                        ₹{service.price}
                                    </span>

                                    <span className="text-zinc-500">
                                        {service.duration}
                                    </span>

                                </div>

                            </motion.div>

                        ))}

                    </div>

                )}

            </div>

        </section>

    );

}