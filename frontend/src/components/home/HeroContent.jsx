import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function HeroContent() {

    return (

        <motion.div

            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}

           className="max-w-2xl text-center lg:text-left"

        >

            <p className="uppercase tracking-[5px] sm:tracking-[8px] text-red-600 text-xs sm:text-sm font-semibold mb-5 lg:mb-6">

                SCIENCE CITY • AHMEDABAD

            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] text-white">

                GLOSS

                <br />

                <span className="text-red-600">

                    & GLOW

                </span>

            </h1>

            <h2 className="mt-8 lg:mt-10 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">

                Making Your Car

                <br />

                Look Brand New.

                <br />

                <span className="text-red-600">

                    Every Day.

                </span>

            </h2>

            <p className="mt-6 lg:mt-8 text-base sm:text-lg leading-8 lg:leading-9 max-w-xl mx-auto lg:mx-0">

                Premium ceramic coating, paint protection,
                detailing and deep interior care delivered with
                professional precision for every vehicle.

            </p>

            <div className="mt-10 lg:mt-14 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">

                <Link

                    to="/booking"

                    className="bg-red-600 hover:bg-red-700 transition-all duration-300 px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-red-600/30"

                >

                    Book Appointment

                </Link>

                <Link

                    to="/services"

                    className="border border-zinc-700 hover:border-red-600 hover:text-white transition-all duration-300 px-8 py-4 rounded-full text-zinc-300 font-semibold"

                >

                    Explore Services

                </Link>

            </div>

        </motion.div>

    );

}