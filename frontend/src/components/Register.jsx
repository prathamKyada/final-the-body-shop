import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register({ setActiveTab }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setError("");

  //     const { fullName, contactNumber, email, password, confirmPassword } =
  //       formData;

  //     // Basic validations
  //     if (!/^\d+$/.test(contactNumber)) {
  //       setError("Contact number should contain only digits.");
  //       return;
  //     }

  //     if (password.length < 6) {
  //       setError("Password must be at least 6 characters long.");
  //       return;
  //     }

  //     if (password !== confirmPassword) {
  //       setError("Passwords do not match.");
  //       return;
  //     }

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:4001/api/auth/register",
  //         {
  //           fullName,
  //           contactNumber,
  //           email,
  //           password,
  //         }
  //       );
  //       alert(response.data.message || "Registration successful! Please log in.");
  //       setFormData({
  //         fullName: "",
  //         contactNumber: "",
  //         email: "",
  //         password: "",
  //         confirmPassword: "",
  //       });
  //       setActiveTab("login");
  //     } catch (err) {
  //       setError(
  //         err.response?.data?.message || "Registration failed! Please try again."
  //       );
  //     }
  //   };
  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();
    setError("");

    console.log("Submitting form with data:", formData); // Debugging

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4001/api/auth/register",
        {
          fullName: formData.fullName,
          contactNumber: formData.contactNumber,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Response from backend:", response.data); // Debugging

      alert(response.data.message || "Registration successful! Please log in.");
      setFormData({
        fullName: "",
        contactNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setActiveTab("login");
    } catch (err) {
      console.error("Error response:", err.response?.data); // Debugging
      setError(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-6 ">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            type="number"
            name="contactNumber"
            placeholder="Phone Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          {/* <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          > */}

          <button
            type="submit"
            onClick={() => console.log("Button clicked")}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
