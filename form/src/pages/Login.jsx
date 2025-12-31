import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/login", formData);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            const msg = err.response?.data?.message || "Login failed";
            setError(msg);

            // Optional auto redirect to register
            if (msg === "User not found") {
                setTimeout(() => navigate("/register"), 2000);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-5 transition-all duration-300 hover:scale-[1.02]"
            >
                <h2 className="text-2xl font-bold text-center text-indigo-600">
                    Sign In
                </h2>

                {error && (
                    <p className="text-red-500 text-sm text-center animate-pulse">
                        {error}{" "}
                        {error === "User not found" && (
                            <Link to="/register" className="text-indigo-500 underline ml-1 hover:text-indigo-700">
                                Register here
                            </Link>
                        )}
                    </p>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold transition hover:bg-indigo-600 active:scale-95 shadow-md"
                >
                    Login
                </button>
            </form>
        </div>
    );
};
