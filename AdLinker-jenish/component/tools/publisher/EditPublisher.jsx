import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPublisher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api";

  const [formData, setFormData] = useState({
    location: "",
    area: "",
    image: null, // ✅ Supports both URLs & File Uploads
    size: { length: "", width: "" },
    pricePerMonth: "",
    traffic: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPublisher();
  }, []);

  const fetchPublisher = async () => {
    try {
      const response = await fetch(`${API_URL}/publishers/${id}`);
      if (!response.ok) throw new Error("Failed to fetch publisher.");
      const data = await response.json();
      setFormData({
        location: data.location,
        area: data.area,
        image: data.image, // ✅ Keep URL for preview
        size: {
          length: data.size[0].length || "",
          width: data.size[0].width || "",
        },
        pricePerMonth: data.pricePerMonth,
        traffic: data.traffic,
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] }); // ✅ Handle file input
    } else if (name === "length" || name === "width") {
      setFormData({ ...formData, size: { ...formData.size, [name]: value } });
      console.log(formData);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to update a publisher.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("location", formData.location);
    formDataToSend.append("area", formData.area);
    if (formData.image instanceof File) {
      formDataToSend.append("image", formData.image); // ✅ Only append if it's a new file
    }
    formDataToSend.append("length", formData.size.length);
    formDataToSend.append("width", formData.size.width);
    formDataToSend.append("pricePerMonth", formData.pricePerMonth);
    formDataToSend.append("traffic", formData.traffic);

    try {
      const response = await fetch(`${API_URL}/publishers/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ No "Content-Type" needed for FormData
        },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to update publisher.");
      alert("Publisher updated successfully!");
      navigate("/publisher");
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg w-full max-w-md" encType="multipart/form-data">
        <h2 className="text-2xl font-bold mb-4">Edit Publisher</h2>

        <label className="block mb-2">Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded-lg" />

        <label className="block mt-2">Area:</label>
        <input type="text" name="area" value={formData.area} onChange={handleChange} className="w-full p-2 border rounded-lg" />

        {/* ✅ File Upload with Preview */}
        <label className="block mt-2">Upload New Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded-lg" />

        {/* ✅ Image Preview */}
        {formData.image && typeof formData.image === "string" && (
          <img src={formData.image} alt="Current" className="mt-2 w-full h-40 object-cover rounded-lg" />
        )}

        <label className="block mt-2">Size - Length:</label>
        <input type="text" name="length" value={formData.size.length} onChange={handleChange} className="w-full p-2 border rounded-lg" />

        <label className="block mt-2">Size - Width:</label>
        <input type="text" name="width" value={formData.size.width} onChange={handleChange} className="w-full p-2 border rounded-lg" />

        <label className="block mt-2">Price Per Month:</label>
        <input type="text" name="pricePerMonth" value={formData.pricePerMonth} onChange={handleChange} className="w-full p-2 border rounded-lg" />

        <label className="block mt-2">Traffic:</label>
        <input type="text" name="traffic" value={formData.traffic} onChange={handleChange} className="w-full p-2 border rounded-lg" />

        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Update Publisher</button>
      </form>
    </div>
  );
}