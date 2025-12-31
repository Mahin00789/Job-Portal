import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function PostJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/jobs", form);
      alert("Job posted successfully");
      navigate("/jobs"); // ✅ redirect to jobs page
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
          <input name="title" placeholder="Job Title" onChange={handleChange} className="w-full mb-3 p-2 border" />
          <input name="company" placeholder="Company" onChange={handleChange} className="w-full mb-3 p-2 border" />
          <input name="location" placeholder="Location" onChange={handleChange} className="w-full mb-3 p-2 border" />
          <input name="type" placeholder="Full-time / Internship" onChange={handleChange} className="w-full mb-3 p-2 border" />
          <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full mb-3 p-2 border" />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Post Job
          </button>
        </form>
      </div>
    </>
  );
}
