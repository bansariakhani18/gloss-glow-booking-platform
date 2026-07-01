import { useEffect, useState } from "react";
import api from "../../api/api";
import { motion } from "motion/react";

export default function ServicesPreview() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadServices() {

            try {

                const res = await api.get("/services");

                setServices(res.data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        }

        loadServices();

    }, []);

    return (

        <section className="bg-[#0b0b0b] py-28">

            <div className="max-w-7xl mx-auto px-8">

                <p className="uppercase tracking-[6px] text-red-500 mb-3">
                    Premium Services
                </p>

                <h2 className="text-5xl font-black text-white mb-14">
                    What We Offer
                </h2>

                {loading ? (

                    <p className="text-zinc-500">
                        Loading services...
                    </p>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {services.map((service) => (

                            <motion.div
                                key={service.id}
                                whileHover={{
                                    y: -10,
                                    scale: 1.03
                                }}
                                className="rounded-3xl border border-white/10 bg-zinc-900 p-8 transition"
                            >

                                <h3 className="text-2xl font-bold text-white">
                                    {service.name}
                                </h3>

                                <p className="text-zinc-400 mt-4 h-20">
                                    {service.description}
                                </p>

                                <div className="mt-6 flex justify-between items-center">

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