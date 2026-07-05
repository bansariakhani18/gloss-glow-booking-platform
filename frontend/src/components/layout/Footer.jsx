import logo from "../../assets/logo/logo.png";
import { Phone, MapPin, Clock, Camera } from "lucide-react";
export default function Footer() {

    return (

        <footer className="bg-black border-t border-white/10 mt-24">

            <div className="max-w-7xl mx-auto px-8 py-20">

                <div className="grid lg:grid-cols-4 gap-16">

                    {/* Brand */}

                    <div>

                        <img
                            src={logo}
                            alt="Gloss & Glow"
                            className="w-36 mb-6"
                        />

                        <h2 className="text-3xl font-black text-white">

                            GLOSS
                            <span className="text-red-600"> & GLOW</span>

                        </h2>

                        <p className="text-zinc-500 mt-3">

                            Premium Auto Detailing Studio

                        </p>

                        <p className="text-zinc-400 mt-8 leading-8">

                            Making Your Car Look Brand New,
                            Every Day.

                        </p>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="text-white font-bold text-xl mb-6">

                            Contact

                        </h3>

                        <div className="space-y-5">

                            <a

                                href="tel:6359221091"

                                className="flex items-center gap-3 text-zinc-400 hover:text-red-500 transition"

                            >

                                <Phone size={18} />

                                6359221091

                            </a>

                            <a

                                href="tel:9737573290"

                                className="flex items-center gap-3 text-zinc-400 hover:text-red-500 transition"

                            >

                                <Phone size={18} />

                                9737573290

                            </a>

                            <div className="flex items-start gap-3 text-zinc-400">

                                <Clock size={18} className="mt-1" />

                                <div>

                                    Mon – Sat

                                    <br />

                                    9:00 AM – 8:00 PM

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Address */}

                    <div>

                        <h3 className="text-white font-bold text-xl mb-6">

                            Visit Us

                        </h3>

                        <a

                            href="https://share.google/9g6sRPS9ttStnZOdF"

                            target="_blank"
                            rel="noreferrer"

                            className="flex items-start gap-3 text-zinc-400 hover:text-red-500 transition leading-8"

                        >

                            <MapPin size={18} className="mt-2" />

                            <span>

                                23,24 Sudarshan Gold

                                <br />

                                Opp. Citroen Workshop

                                <br />

                                Science City

                                <br />

                                Ahmedabad – 380060

                            </span>

                        </a>

                    </div>

                    {/* Social */}

                    <div>

                        <h3 className="text-white font-bold text-xl mb-6">

                            Follow Us

                        </h3>

                        <a

                            href="https://www.instagram.com/gloss_and_glow_car_detailing_?igsh=d2NrbXVjNDdpMWUw"

                            target="_blank"
                            rel="noreferrer"

                            className="inline-flex items-center gap-3 border border-red-600 rounded-full px-6 py-4 text-white hover:bg-red-600 transition"

                        >

                            <Camera size={20} />

                            Instagram

                        </a>

                        <p className="text-zinc-500 mt-6 leading-8">

                            Follow our latest detailing projects,
                            ceramic coatings and customer
                            transformations.

                        </p>

                    </div>

                </div>

                <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between text-zinc-500 text-sm">

                    <span>

                        © 2026 Gloss & Glow Premium Auto Detailing Studio

                    </span>

                    <span>

                        Ahmedabad, Gujarat

                    </span>

                </div>

            </div>

        </footer>

    );

}