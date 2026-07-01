export default function ServiceCard({ service }) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "8px"
            }}
        >
            <h2>{service.name}</h2>

            <p>{service.description}</p>

            <p>
                <strong>Price:</strong> ₹{service.price}
            </p>

            <p>
                <strong>Duration:</strong> {service.duration}
            </p>
        </div>
    );
}