import Hero from "../components/home/Hero";
import ServicesPreview from "../components/home/ServicesPreview";
import BrandStatement from "../components/home/BrandStatement";
import WhyChooseUs from "../components/home/WhyChooseUs";
import BookingCTA from "../components/home/BookingCTA";

export default function Home() {
    return (
        <>
            <Hero />
            <ServicesPreview />
            <BrandStatement />
            <WhyChooseUs />
            <BookingCTA />
        </>
    );
}