import { motion } from "motion/react";

export default function BrandStatement() {

    return (

        <section className="bg-[#050505] py-36">

            <motion.div

                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}

                className="max-w-5xl mx-auto px-8 text-center"

            >

                <p className="uppercase tracking-[8px] text-red-600 mb-8">

                    OUR PHILOSOPHY

                </p>

                <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight">

                    WE DON'T JUST
                    <br />

                    DETAIL CARS.

                </h2>

                <h3 className="text-5xl lg:text-7xl font-black text-red-600 mt-6 leading-tight">

                    WE RESTORE PRIDE.

                </h3>

                <p className="text-zinc-400 text-2xl mt-12 leading-10">

                    Making Your Car Look Brand New,
                    Every Day.

                </p>

            </motion.div>

        </section>

    );

}