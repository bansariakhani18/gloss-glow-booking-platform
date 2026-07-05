import { motion } from "motion/react";
import { Camera, ArrowUpRight } from "lucide-react";
export default function InstagramCTA() {

    return (

        <section className="bg-black py-28">

            <div className="max-w-5xl mx-auto px-8">

                <motion.div

                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}

                    className="rounded-[40px] border border-red-600/20 bg-gradient-to-br from-[#111111] to-[#090909] p-16 text-center"

                >

                    <div className="flex justify-center mb-8">

                        <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center">

                            <Camera
                              size={36}
                              className="text-white"
                            />

                        </div>

                    </div>

                    <p className="uppercase tracking-[8px] text-red-500 text-sm mb-4">

                        Follow Our Journey

                    </p>

                    <h2 className="text-5xl font-black text-white mb-6">

                        See Real Transformations

                    </h2>

                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-8 mb-12">

                        Every vehicle tells a story.
                        Follow us on Instagram to see our latest detailing,
                        ceramic coating and paint protection projects.

                    </p>

                    <a

                        href="https://www.instagram.com/gloss_and_glow_car_detailing_?igsh=d2NrbXVjNDdpMWUw"

                        target="_blank"

                        rel="noreferrer"

                        className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-full text-white font-semibold"

                    >

                        Visit Instagram

                        <ArrowUpRight size={20} />

                    </a>

                </motion.div>

            </div>

        </section>

    );

}