import Button from "../ui/Button";

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-[#090909] text-white">

            <div className="text-center">

                <p className="text-red-500 uppercase tracking-[8px] mb-6">
                    Premium Car Detailing
                </p>

                <h1 className="text-7xl font-black">
                    GLOSS
                    <br />
                    <span className="text-red-600">& GLOW</span>
                </h1>

                <p className="mt-8 text-zinc-400 max-w-xl mx-auto">
                    Luxury detailing that restores, protects and transforms your vehicle.
                </p>

                <div className="mt-10">
                    <Button>
                        Book Appointment
                    </Button>
                </div>

            </div>

        </section>
    );
}