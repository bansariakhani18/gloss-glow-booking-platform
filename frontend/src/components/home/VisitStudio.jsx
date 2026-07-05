import { motion } from "motion/react";
import { MapPin, Clock3, Phone, ArrowUpRight } from "lucide-react";

export default function VisitStudio() {
    return (
        <section className="bg-[#050505] py-28">

            <div className="max-w-7xl mx-auto px-8">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >

                    <p className="uppercase tracking-[8px] text-red-600 text-sm mb-4">
                        Visit Our Studio
                    </p>

                    <h2 className="text-5xl lg:text-6xl font-black text-white">
                        Experience Premium Detailing
                    </h2>

                </motion.div>

                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    {/* Left */}

                    <motion.div

                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}

                        className="space-y-10"

                    >

                        <div>

                            <h3 className="text-3xl font-bold text-white mb-4">

                                Gloss & Glow Premium Auto Detailing Studio

                            </h3>

                            <p className="text-zinc-400 leading-8 text-lg">

                                We specialize in premium car detailing,
                                ceramic coating and paint protection using
                                professional-grade products and equipment.

                            </p>

                        </div>

                        <div className="space-y-7">

                            <div className="flex gap-5">

                                <MapPin
                                    className="text-red-500 mt-1"
                                    size={24}
                                />

                                <div>

                                    <h4 className="text-white font-semibold text-lg">

                                        Location

                                    </h4>

                                    <p className="text-zinc-400">

                                        23,24 Sudarshan Gold<br />

                                        Opp. Citroen Workshop<br />

                                        Science City, Sola<br />

                                        Ahmedabad – 380060

                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-5">

                                <Clock3
                                    className="text-red-500 mt-1"
                                    size={24}
                                />

                                <div>

                                    <h4 className="text-white font-semibold text-lg">

                                        Opening Hours

                                    </h4>

                                    <p className="text-zinc-400">

                                        Monday – Saturday<br />

                                        9:00 AM – 8:00 PM

                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-5">

                                <Phone
                                    className="text-red-500 mt-1"
                                    size={24}
                                />

                                <div>

                                    <h4 className="text-white font-semibold text-lg">

                                        Call Us

                                    </h4>

                                    <p className="text-zinc-400">

                                        +91 63592 21091

                                    </p>

                                </div>

                            </div>

                        </div>

                        <a

                            href="https://share.google/9g6sRPS9ttStnZOdF"

                            target="_blank"

                            rel="noopener noreferrer"

                            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-full text-white font-semibold"

                        >

                            Get Directions

                            <ArrowUpRight size={20} />

                        </a>

                    </motion.div>

                    {/* Right */}

                    <motion.div

                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}

                    >

                        <iframe

                            title="Gloss & Glow"

                            src="https://www.google.com/maps?q=Science+City+Ahmedabad&output=embed"

                            className="rounded-3xl w-full h-[500px] border border-white/10"

                            loading="lazy"

                        />

                    </motion.div>

                </div>

            </div>

        </section>
    );
}