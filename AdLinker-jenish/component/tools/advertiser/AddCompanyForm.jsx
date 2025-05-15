import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCompanyForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    typeOfProduction: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // ✅ Get JWT token

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to add a company.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/advertisers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Send JWT token
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Company added successfully!");
        setFormData({
          companyName: "",
          typeOfProduction: "",
          address: "",
          phoneNumber: "",
          email: "",
        });
        navigate("/advertiser");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Add Company Information</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Company Name <span className="text-red-500">*</span></label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700">Type of Advertise <span className="text-red-500">*</span></label>
            <input type="text" name="typeOfProduction" value={formData.typeOfProduction} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700">Address <span className="text-red-500">*</span></label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number <span className="text-red-500">*</span></label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700">Email Address <span className="text-red-500">*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          </div>
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
