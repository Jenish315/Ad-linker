import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PublishForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: "",
    area: "",
    image: null, // Change from string to file
    size: { length: "", width: "" },
    pricePerMonth: "",
    traffic: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "length" || name === "width") {
      setFormData((prev) => ({
        ...prev,
        size: { ...prev.size, [name]: value },
      }));
    } else if (name === "image") {
      setFormData({ ...formData, image: files[0] }); // Handle file input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("location", formData.location);
    formDataToSend.append("area", formData.area);
    formDataToSend.append("image", formData.image); // Append file
    formDataToSend.append("length", formData.size.length);
    formDataToSend.append("width", formData.size.width);
    formDataToSend.append("pricePerMonth", formData.pricePerMonth);
    formDataToSend.append("traffic", formData.traffic);

    try {
      const response = await fetch("http://localhost:5000/api/publishers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Wall data submitted successfully!");
        navigate("/publisher");
      } else {
        setError(data.message || "Submission failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center">Publisher Wall Form</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="mt-6" onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Location */}
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />

          {/* Area */}
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Area (e.g. Downtown, NY)"
            required
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />

          {/* Image Upload */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />

          {/* Size (Length & Width) */}
          <div className="flex gap-4">
            <input
              type="number"
              name="length"
              value={formData.size.length}
              onChange={handleChange}
              placeholder="Length"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="width"
              value={formData.size.width}
              onChange={handleChange}
              placeholder="Width"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Price Per Month */}
          <input
            type="number"
            name="pricePerMonth"
            value={formData.pricePerMonth}
            onChange={handleChange}
            placeholder="Price Per Month"
            required
            className="w-full p-3 border border-gray-300 rounded-md mt-4"
          />

          {/* Traffic */}
          <input
            type="number"
            name="traffic"
            value={formData.traffic}
            onChange={handleChange}
            placeholder="Traffic (Daily Visitors)"
            required
            className="w-full p-3 border border-gray-300 rounded-md mt-4"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 mt-6 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}