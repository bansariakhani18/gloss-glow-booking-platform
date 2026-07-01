export default function SectionTitle({
    title,
    subtitle
}) {
    return (
        <div className="text-center mb-14">

            <h2 className="text-4xl md:text-5xl font-bold text-white">
                {title}
            </h2>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                {subtitle}
            </p>

        </div>
    );
}