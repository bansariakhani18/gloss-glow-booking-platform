import { useState } from "react";
import { CalendarDays, PhoneCall } from "lucide-react";
import BookingForm from "../components/booking/BookingForm";
import { useSearchParams } from "react-router-dom";

export default function Booking() {

const [searchParams] = useSearchParams();

const [showForm, setShowForm] = useState(
    searchParams.get("online") === "true"
);
    return (

        <section className="min-h-screen bg-[#080808] text-white py-32 px-8">

            <div className="max-w-6xl mx-auto">

                <div className="text-center">

                    <p className="uppercase tracking-[6px] text-red-600 mb-4">

                        BOOK APPOINTMENT

                    </p>

                    <h1 className="text-5xl lg:text-7xl font-black">

                        Choose How You'd

                        <br />

                        Like To Continue

                    </h1>

                    <p className="text-zinc-400 text-lg mt-8 max-w-2xl mx-auto leading-8">

                        Whether you'd like to schedule your appointment online
                        or arrange vehicle pickup, we've made it simple.

                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-10 mt-24">

                    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-12 hover:border-red-600 transition">

                        <CalendarDays
                            size={52}
                            className="text-red-600 mb-8"
                        />

                        <h2 className="text-3xl font-bold">

                            Book Online

                        </h2>

                        <p className="text-zinc-400 mt-6 leading-8">

                            Schedule your detailing appointment online by selecting
                            your preferred service, date and time.

                        </p>

                        <button

                           onClick={() => {

                          setShowForm(true);

                        setTimeout(() => {

                            document
                         .getElementById("booking-form")
                         ?.scrollIntoView({
                         behavior: "smooth"
            });

    }, 100);

}}

                            className="mt-10 bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-full font-semibold"

                        >

                            Continue

                        </button>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-12 hover:border-red-600 transition">

                        <PhoneCall
                            size={52}
                            className="text-red-600 mb-8"
                        />

                        <h2 className="text-3xl font-bold">

                            Need Vehicle Pickup?

                        </h2>

                        <p className="text-zinc-400 mt-6 leading-8">

                            Call us to arrange vehicle pickup and drop based on
                            your location.

                        </p>

                        <a

                            href="tel:+916359221091"

                            className="inline-block mt-10 border border-red-600 hover:bg-red-600 transition px-8 py-4 rounded-full font-semibold"

                        >

                            Call Now

                        </a>

                    </div>

                </div>

                {showForm && <BookingForm />}

            </div>

        </section>

    );

}