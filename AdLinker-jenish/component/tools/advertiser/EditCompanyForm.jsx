import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCompanyForm() {
  const { id } = useParams(); 
  console.log("Editing company with ID:", id); // ✅ Check if it's correct
  // ✅ Get company ID from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // ✅ Get JWT token from local storage

  const [formData, setFormData] = useState({
    companyName: "",
    typeOfProduction: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch the existing company data
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/advertisers/${id}`);
        if (!response.ok) throw new Error("Failed to fetch company details.");
        
        const data = await response.json();
        setFormData(data); // ✅ Pre-fill form with fetched data
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/advertisers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Include JWT token for authorization
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Company updated successfully!");
        navigate("/advertiser"); // ✅ Redirect to advertiser page
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Failed to update company.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Company</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Company Name</label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700">Type of Production</label>
            <input type="text" name="typeOfProduction" value={formData.typeOfProduction} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          </div>
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}