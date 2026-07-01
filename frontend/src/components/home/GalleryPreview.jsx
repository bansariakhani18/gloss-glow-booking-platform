import { motion } from "motion/react";
import { Link } from "react-router-dom";

import g1 from "../../assets/gallery/gallery1.jpeg";
import g2 from "../../assets/gallery/gallery2.jpeg";
import g3 from "../../assets/gallery/gallery3.jpeg";
import g4 from "../../assets/gallery/gallery4.jpeg";
import g5 from "../../assets/gallery/gallery5.jpeg";
import reel from "../../assets/gallery/gallery6.mp4";

const images = [
    g1,
    g2,
    g3,
    g4,
    g5
];

export default function GalleryPreview() {

    return (

        <section className="bg-[#050505] py-28">

            <div className="max-w-7xl mx-auto px-8">

                <p className="uppercase tracking-[6px] text-red-500 mb-3">
                    Gallery
                </p>

                <div className="flex justify-between items-end mb-14">

                    <h2 className="text-5xl font-black text-white">

                        Recent Transformations

                    </h2>

                    <Link

                        to="/gallery"

                        className="text-red-500 hover:text-white transition"

                    >

                        View Gallery →

                    </Link>

                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">

                    {images.map((img, index) => (

                        <motion.div

                            key={index}

                            whileHover={{ scale: 1.03 }}

                            className="overflow-hidden rounded-3xl group"

                        >

                            <img

                                src={img}

                                className="h-[330px] w-full object-cover transition duration-500 group-hover:scale-110"

                            />

                        </motion.div>

                    ))}

                    <motion.div

                        whileHover={{ scale: 1.03 }}

                        className="overflow-hidden rounded-3xl relative group"

                    >

                        <video
                         src={reel}
                         autoPlay
                         muted
                         loop
                         playsInline
                         controls={false}
                         preload="auto"
                         className="w-full h-full object-cover rounded-3xl"
/>

                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center">

                            <div className="text-white text-6xl">

                                ▶

                            </div>

                        </div>

                    </motion.div>

                </div>

            </div>

        </section>

    );

}