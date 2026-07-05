import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function BookingCTA() {

    return (

        <section className="py-36 bg-[#080808]">

            <motion.div

                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}

                className="max-w-5xl mx-auto px-8 text-center"

            >

                <p className="uppercase tracking-[6px] text-red-600 mb-6">

                    BOOK YOUR APPOINTMENT

                </p>

                <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight">

                    YOUR CAR

                    <br />

                    DESERVES MORE

                </h2>

                <p className="text-zinc-400 text-xl mt-10 leading-9 max-w-3xl mx-auto">

                    Experience premium detailing, ceramic coating and paint
                    protection using professional products trusted by
                    enthusiasts across Ahmedabad.

                </p>

                <div className="mt-14 flex flex-wrap justify-center gap-6">

                    <Link

                        to="/booking"

                        className="bg-red-600 hover:bg-red-700 px-10 py-5 rounded-full text-lg font-semibold transition"

                    >

                        Book Appointment

                    </Link>

                    <a

                        href="tel:6359221091"

                        className="border border-red-600 hover:bg-red-600 px-10 py-5 rounded-full text-lg font-semibold transition"

                    >

                        Call Now

                    </a>

                </div>

            </motion.div>

        </section>

    );

}