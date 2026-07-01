import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
    return (
        <section className="relative bg-[#050505] overflow-hidden">

            <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-red-600/20 blur-[160px]" />

            <div className="max-w-[1500px] mx-auto">

                <div className="grid lg:grid-cols-2 items-center min-h-screen px-8 gap-16">

                    <HeroContent />

                    <HeroImage />

                </div>

            </div>

        </section>
    );
}