import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function AdminLogin() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

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

            const res = await api.post("/auth/login", formData);

console.log(res.data);

alert("Login successful");

navigate("/admin/dashboard");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Login failed"

            );

        }

        setLoading(false);

    }

    return (

        <section className="min-h-screen bg-[#080808] flex items-center justify-center px-6">

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-10">

                <p className="uppercase tracking-[9px] text-red-600 mb-3">

                        GLOSS & GLOW


                </p>

                <h1 className="text-3xl font-black text-white mb-3">

                    Studio Dashboard

                </h1>

                <p className="text-zinc-400 mb-10 leading-7">

                    

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <input

                        type="text"

                        name="username"

                        placeholder="Username"

                        value={formData.username}

                        onChange={handleChange}

                        required

                        className="w-full rounded-xl bg-black border border-white/10 px-5 py-4 text-white focus:border-red-600 outline-none transition"

                    />

                    <input

                        type="password"

                        name="password"

                        placeholder="Password"

                        value={formData.password}

                        onChange={handleChange}

                        required

                        className="w-full rounded-xl bg-black border border-white/10 px-5 py-4 text-white focus:border-red-600 outline-none transition"

                    />

                    <button

                        disabled={loading}

                        className="w-full bg-red-600 hover:bg-red-700 transition rounded-xl py-4 font-semibold"

                    >

                        {loading

                            ? "Signing In..."

                            : "Sign In"}

                    </button>

                </form>

            </div>

        </section>

    );

}