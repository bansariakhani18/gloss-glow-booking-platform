import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import api from "../../api/api";

import basicWash from "../../assets/services/standard-wash.jpg";
import interiorCleaning from "../../assets/services/interior-cleaning.jpg";
import detailing from "../../assets/services/detailing.jpg";
import ceramic from "../../assets/services/ceramic-coating.jpg";

export default function ServicesPreview() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);


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

    const serviceImages = {
        "Basic Wash": basicWash,
        "Interior Cleaning": interiorCleaning,
        "Full Detailing": detailing,
        "Ceramic Coating": ceramic,
    };

    return (

        <section className="bg-[#050505] py-28">

            <div className="max-w-7xl mx-auto px-8">

                <motion.div

                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}

                    className="text-center mb-20"

                >

                    <p className="uppercase tracking-[8px] text-red-600 text-sm mb-4">

                        Our Premium Services

                    </p>

                    <h2 className="text-5xl lg:text-6xl font-black text-white">

                        Luxury Care For Every Vehicle

                    </h2>

                    <p className="text-zinc-400 text-lg mt-6 max-w-2xl mx-auto">

                        Professional detailing services using premium products
                        and modern equipment to restore, protect and enhance
                        your vehicle.

                    </p>

                </motion.div>

                {loading ? (

                    <div className="text-center text-zinc-500">

                        Loading Services...

                    </div>

                ) : (

                    <div className="grid lg:grid-cols-2 gap-10">

                        {services
    .filter(service =>
        serviceImages[service.name]
    )
    .map((service) => (

                            <motion.div

                                key={service.id}

                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}

                                whileHover={{
                                    y: -8
                                }}

                                className="group overflow-hidden rounded-3xl bg-[#111111] border border-white/10 hover:border-red-600 transition-all duration-500"

                            >

                                <div className="overflow-hidden h-72">

                                    <img

                                        src={serviceImages[service.name]}
                                        alt={service.name}

                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"

                                    />

                                </div>

                                <div className="p-8">

                                    <div className="flex justify-between items-center mb-5">

                                        <h3 className="text-3xl font-bold text-white">

                                            {service.name}

                                        </h3>

                                        <span className="text-red-500 text-2xl font-black">

                                            ₹{service.price}

                                        </span>

                                    </div>

                                    <p className="text-zinc-400 leading-8 mb-8">

                                        {service.description}

                                    </p>

                                    <div className="flex items-center justify-between">

                                        <span className="text-zinc-500">

                                            ⏱ {service.duration}

                                        </span>

                                        <Link

                                            to="/booking"

                                            className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-full text-white font-semibold"

                                        >

                                            Book Now

                                        </Link>

                                    </div>

                                </div>

                            </motion.div>

                        ))}

                    </div>

                )}

            </div>
            <div className="text-center mt-16">

    <Link
        to="/services"
        className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-full text-white font-semibold text-lg"
    >
        View All Services →
    </Link>

</div> {/* end max-w-7xl */}

        </section>

    );

}