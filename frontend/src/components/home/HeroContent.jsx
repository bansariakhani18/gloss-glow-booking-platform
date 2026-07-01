import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function HeroContent() {

    return (

        <motion.div

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8 }}

        >

            <p className="uppercase tracking-[7px] text-red-500 mb-2">

                PREMIUM CAR DETAILING

            </p>

            <h1 className="text-7xl xl:text-8xl font-black leading-none">

                GLOSS

                <br />

                <span className="text-red-600">

                    & GLOW

                </span>

            </h1>

            <p className="mt-4 text-zinc-400 text-xl leading-8 max-w-lg">

                Luxury detailing that restores shine,
                protects paint and makes every drive
                feel brand new.

            </p>

            <div className="flex gap-5 mt-7">

                <Link

                    to="/booking"

                    className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full transition font-semibold"

                >

                    Book Appointment

                </Link>

                <Link

                    to="/services"

                    className="border border-white/20 hover:bg-white hover:text-black transition px-8 py-4 rounded-full"

                >

                    Explore Services

                </Link>

            </div>

        </motion.div>

    );

}