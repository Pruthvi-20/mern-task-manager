import axios, { toFormData } from 'axios';
import { useState } from 'react';
import api from '../api';
import { useNavigate } from "react-router-dom";


export const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        // console.log("Incoming body:", req.body);
        e.preventDefault();

        try {
            await api.post('/register', formData);
            alert("User Registered Successfully");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            });
            navigate("/login");
        }
        catch (error) {
            console.error("Error Saving User Data", error);
        }

        // console.log("Form Data Submitted:", submitData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-5 transition-all duration-300 hover:scale-[1.02]"
            >
                <div>
                    <h1 className="text-2xl font-bold text-center text-indigo-600">
                        Create Your Account
                    </h1>
                    <p className="text-center text-gray-500 text-sm mb-6">
                        Please fill in the form to create an account
                    </p>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your first name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                        required
                    />

                    <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
                        Last Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                        required
                    />

                    <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                        required
                    />

                    <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                        required
                    />

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold transition hover:bg-indigo-600 active:scale-95 shadow-md"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
