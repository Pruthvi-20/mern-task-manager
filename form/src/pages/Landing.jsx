import { Link } from "react-router-dom";

export const Landing = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-col">

            {/* HERO */}
            <section className="flex flex-col items-center justify-center flex-1 text-center px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
                    Organize Your Work.<br />Achieve More 🚀
                </h1>
                <p className="max-w-xl text-lg md:text-xl text-white/90 mb-8">
                    A smart task management system to plan, track and complete your work efficiently.
                </p>

                <div className="flex gap-4">
                    <Link
                        to="/register"
                        state={{ fromApp: true }}
                        className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/login"
                        state={{ fromApp: true }}
                        className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition"
                    >
                        Login
                    </Link>
                </div>
            </section>

            {/* FEATURES */}
            <section className="bg-white text-gray-800 py-16 px-6">
                <h2 className="text-3xl font-bold text-center mb-10">Why Choose TaskFlow?</h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <Feature title="Smart Organization" icon="📋" desc="Manage tasks with priorities and due dates easily." />
                    <Feature title="Progress Tracking" icon="📊" desc="Visualize completed and pending tasks clearly." />
                    <Feature title="Secure Access" icon="🔐" desc="Your data is protected with authentication and authorization." />
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-gray-900 text-gray-400 text-center py-4 text-sm">
                © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </footer>
        </div>
    );
};

const Feature = ({ title, icon, desc }) => (
    <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-600">{desc}</p>
    </div>
);
