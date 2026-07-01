import { motion } from "motion/react";

const items = [

    {

        value: "500+",

        title: "Happy Clients"

    },

    {

        value: "★★★★★",

        title: "Rated 5.0"

    }

];

export default function Stats() {

    return (

        <section className="bg-black py-16">

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-8">

                {items.map((item, index) => (

                    <motion.div

                        key={index}

                        initial={{ opacity: 0, y: 30 }}

                        whileInView={{ opacity: 1, y: 0 }}

                        viewport={{ once: true }}

                        whileHover={{

                            y: -6,

                            scale: 1.03

                        }}

                        className="rounded-3xl border border-white/10 bg-zinc-900 px-10 py-8 transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_25px_rgba(255,0,0,0.2)]"

                    >

                        <h2 className="text-4xl font-black text-white">

                            {item.value}

                        </h2>

                        <p className="mt-2 uppercase tracking-[4px] text-zinc-400">

                            {item.title}

                        </p>

                    </motion.div>

                ))}

            </div>

        </section>

    );

}