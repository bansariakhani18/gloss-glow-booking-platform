import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import ServicesPreview from "../components/home/ServicesPreview";
import GalleryPreview from "../components/home/GalleryPreview";

export default function Home() {
    return (
        <>
            <Hero />
            <Stats />
            <ServicesPreview />
            <GalleryPreview />
        </>
    );
}