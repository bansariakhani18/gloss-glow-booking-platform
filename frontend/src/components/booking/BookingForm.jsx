import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import api from "../../api/api";
export default function BookingForm() {

    const [services, setServices] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);

    const [formData, setFormData] = useState({
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        service_type: "",
        preferred_date: "",
        preferred_time: "",
        vehicle_model: "",
        notes: ""
    });

    const [loading, setLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(null);
    const successRef = useRef(null);
    useEffect(() => {

    if (bookingSuccess && successRef.current) {

        successRef.current.scrollIntoView({

            behavior: "smooth",
            block: "center"

        });

    }

}, [bookingSuccess]);

    useEffect(() => {

        async function loadData() {

            try {

                const [servicesRes, slotsRes] = await Promise.all([
                    api.get("/services"),
                    api.get("/time-slots")
                ]);

                setServices(servicesRes.data);
                setTimeSlots(slotsRes.data);

            }

            catch (err) {

                console.error(err);

            }

        }

        loadData();

    }, []);

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        try {

            const res = await api.post("/appointments", formData);
setBookingSuccess({
    service: formData.service_type,
    date: formData.preferred_date,
    time: formData.preferred_time
});

setFormData({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    service_type: "",
    preferred_date: "",
    preferred_time: "",
    vehicle_model: "",
    notes: ""
});

        }

        catch (err) {

           toast.error(
           err.response?.data?.message || "Booking failed"
);

        }

        setLoading(false);

    }

    return (

        <section
            id="booking-form"
            className="mt-32"
        >

            <div className="max-w-5xl mx-auto bg-zinc-900 rounded-3xl border border-white/10 p-10">

                <h2 className="text-3xl font-black mb-10">
                    Book Online
                </h2>
                {bookingSuccess ? (

<div
    ref={successRef}
    className="text-center py-8 animate-fadeIn"
>    
    <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-8">

        <span className="text-3xl text-green-400">
            ✓
        </span>

    </div>

    <h2 className="text-3xl font-black mb-4">

        Appointment Confirmed

    </h2>

    <p className="text-zinc-400 max-w-xl mx-auto leading-8">

       We've received your booking request.

Our team will contact you shortly to confirm your appointment.

    </p>

    <div className="mt-10 rounded-2xl border border-white/10 bg-black/40 p-6 max-w-sm mx-auto text-left">

        <p className="text-zinc-500 mb-2">
            Service
        </p>

        <p className="font-semibold mb-6">
            {bookingSuccess.service}
        </p>

        <p className="text-zinc-500 mb-2">
            Date
        </p>

        <p className="font-semibold mb-6">
            {bookingSuccess.date}
        </p>

        <p className="text-zinc-500 mb-2">
            Time
        </p>

        <p className="font-semibold">
            {bookingSuccess.time}
        </p>

    </div>

    <button

        onClick={() => setBookingSuccess(null)}

        className="mt-10 bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-full font-semibold"

    >

       Schedule Another Booking

    </button>

</div>

) : (


                <form

                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-6"
                >

                    <input
                        name="customer_name"
                        placeholder="Full Name"
                        value={formData.customer_name}
                        onChange={handleChange}
                        required
                        className="bg-black rounded-xl p-4"
                    />

                    <input
                        name="customer_phone"
                        placeholder="Phone Number"
                        value={formData.customer_phone}
                        onChange={handleChange}
                        required
                        className="bg-black rounded-xl p-4"
                    />

                    <input
                        name="customer_email"
                        placeholder="Email (Optional)"
                        value={formData.customer_email}
                        onChange={handleChange}
                        className="bg-black rounded-xl p-4"
                    />

                    <select
                        name="service_type"
                        value={formData.service_type}
                        onChange={handleChange}
                        required
                        className="bg-black rounded-xl p-4"
                    >

                        <option value="">
                            Select Service
                        </option>

                        {services.map(service => (

                            <option
                                key={service.id}
                                value={service.name}
                            >
                                {service.name}
                            </option>

                        ))}

                    </select>

                    <input
                        type="date"
                        name="preferred_date"
                        value={formData.preferred_date}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className="bg-black rounded-xl p-4"
                    />

                    <select
                        name="preferred_time"
                        value={formData.preferred_time}
                        onChange={handleChange}
                        required
                        className="bg-black rounded-xl p-4"
                    >

                        <option value="">
                            Select Time
                        </option>

                        {timeSlots.map(slot => (

                            <option
                                key={slot}
                                value={slot}
                            >
                                {slot}
                            </option>

                        ))}

                    </select>

                    <input
                        name="vehicle_model"
                        placeholder="Vehicle (e.g. Hyundai Creta)"
                        value={formData.vehicle_model}
                        onChange={handleChange}
                        className="bg-black rounded-xl p-4 md:col-span-2"
                    />

                    <textarea
                        name="notes"
                        placeholder="Special Instructions"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="5"
                        className="bg-black rounded-xl p-4 md:col-span-2"
                    />

                    <button
                        disabled={loading}
                        className="md:col-span-2 bg-red-600 hover:bg-red-700 rounded-xl py-4 font-semibold text-lg transition"
                    >

                        {loading
                            ? "Booking..."
                            : "Book Appointment"}

                    </button>
                    

                </form>
                )}

            </div>

        </section>

    );

}