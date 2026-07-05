import { motion } from "motion/react";
import {
    ShieldCheck,
    Sparkles,
    Clock3,
    Award
} from "lucide-react";

const features = [
    {
        icon: Sparkles,
        title: "Premium Products",
        description:
            "We use professional detailing chemicals, ceramic coatings and premium equipment trusted by experts."
    },
    {
        icon: ShieldCheck,
        title: "Paint Protection",
        description:
            "From deep cleaning to ceramic protection, every service is designed to preserve your vehicle."
    },
    {
        icon: Clock3,
        title: "Quick Turnaround",
        description:
            "Quality doesn't have to take forever. Most services are completed the same day."
    },
    {
        icon: Award,
        title: "Attention To Detail",
        description:
            "Every vehicle is treated with precision and care, ensuring a showroom-quality finish."
    }
];

export default function WhyChooseUs() {
    return (
        <section className="bg-black py-28">

            <div className="max-w-7xl mx-auto px-8">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >

                    <p className="uppercase tracking-[8px] text-red-600 text-sm mb-4">
                        Why Choose Us
                    </p>

                    <h2 className="text-5xl lg:text-6xl font-black text-white">
                        More Than Just A Car Wash
                    </h2>

                    <p className="text-zinc-400 max-w-3xl mx-auto mt-6 text-lg leading-8">
                        Every vehicle receives professional care using premium
                        products, modern equipment and meticulous attention to
                        detail.
                    </p>

                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {features.map((feature, index) => {

                        const Icon = feature.icon;

                        return (

                            <motion.div

                                key={index}

                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}

                                whileHover={{
                                    y: -8
                                }}

                                className="group border border-white/10 rounded-3xl p-8 bg-[#111111] hover:border-red-600 transition-all duration-500"

                            >

                                <div className="w-16 h-16 rounded-2xl bg-red-600/10 flex items-center justify-center mb-8 group-hover:bg-red-600 transition">

                                    <Icon
                                        size={30}
                                        className="text-red-500 group-hover:text-white transition"
                                    />

                                </div>

                                <h3 className="text-2xl font-bold text-white mb-5">

                                    {feature.title}

                                </h3>

                                <p className="text-zinc-400 leading-8">

                                    {feature.description}

                                </p>

                            </motion.div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}