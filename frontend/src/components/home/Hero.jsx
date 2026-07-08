import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {

    return (

        <section className="relative bg-[#050505] overflow-hidden">

            <div className="absolute right-0 top-20 w-[500px] h-[500px] rounded-full bg-red-600/20 blur-[180px]" />

            <div className="max-w-[1500px] mx-auto px-8">

                <div className="
grid
lg:grid-cols-2
gap-10
lg:gap-24
items-center
min-h-screen
pt-32
lg:pt-28
pb-16
">

                    <HeroContent />

                    <HeroImage />

                </div>

            </div>

        </section>

    );

}