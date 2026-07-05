import gallery1 from "../assets/gallery/gallery1.jpeg";
import gallery2 from "../assets/gallery/gallery2.jpeg";
import gallery3 from "../assets/gallery/gallery3.jpeg";
import gallery4 from "../assets/gallery/gallery4.jpeg";
import gallery5 from "../assets/gallery/gallery5.jpeg";
import video from "../assets/gallery/gallery6.mp4";


export default function Gallery() {

    return (

        <main className="bg-[#080808] text-white">

            <section className="pt-36 pb-24">

                <div className="max-w-7xl mx-auto px-8">

                    <p className="uppercase tracking-[6px] text-red-600 mb-5">

                        OUR WORK

                    </p>

                    <h1 className="text-5xl lg:text-7xl font-black leading-tight">

                        Real Transformations.

                        <br />

                        Real Results.

                    </h1>

                    <p className="text-zinc-400 mt-8 text-lg max-w-2xl leading-8">

                        Every vehicle that enters our studio receives the same
                        attention to detail, premium products and professional
                        craftsmanship.

                    </p>

                </div>

            </section>

            <section className="pb-32">

    <div className="max-w-6xl mx-auto px-8">

        <div className="mb-24">

            <p className="uppercase tracking-[6px] text-red-600 mb-3">
                Our Recent Work
            </p>

            <h2 className="text-5xl font-black">
                Craftsmanship in Every Detail
            </h2>

        </div>

        {/* Large */}

        <img
            src={gallery1}
            alt=""
            className="w-full h-[620px] object-cover rounded-[40px] hover:scale-[1.01] transition duration-700"
        />

        {/* Two Images */}

        <div className="grid md:grid-cols-2 gap-10 my-20">

            
             <img
                src={gallery5}
                alt=""
                className="w-[70%] h-[420px] object-cover rounded-[40px] hover:scale-[1.02] transition duration-700"
            />
            
        <img
            src={gallery4}
            alt=""
            className="w-full h-[420px] object-cover rounded-[40px] hover:scale-[1.01] transition duration-700"
        />
            

        </div>

        {/* Large */}

         <img
                src={gallery2}
                alt=""
                className="h-[500px] w-full object-cover rounded-[36px] hover:scale-[1.02] transition duration-700"
            />

        {/* Last Image */}

        <div className="flex justify-center mt-20">

            <img
                src={gallery3}
                alt=""
                className="h-[500px] w-full object-cover rounded-[36px] hover:scale-[1.02] transition duration-700"
            />

        </div>

    </div>

</section>
        </main>

    );

}