import GalleryPreview from "../components/home/GalleryPreview";

export default function Gallery() {
    return (
        <div className="bg-[#050505] min-h-screen">

            <section className="py-24 border-b border-white/10">

                <div className="max-w-7xl mx-auto px-8 text-center">

                    <p className="uppercase tracking-[8px] text-red-500 mb-4">
                        Gallery
                    </p>

                    <h1 className="text-6xl font-black text-white">
                        Real Cars.
                        <br />
                        Real Transformations.
                    </h1>

                    <p className="text-zinc-400 text-xl mt-8 max-w-3xl mx-auto leading-9">
                        Every vehicle receives premium attention using
                        professional detailing products and techniques.
                        Here's a glimpse of our recent work.
                    </p>

                </div>

            </section>

            <GalleryPreview />

        </div>
    );
}