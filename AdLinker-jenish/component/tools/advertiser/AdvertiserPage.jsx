import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AdviserPage() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [user, setUser] = useState(null);

  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/advertisers`);
      if (!response.ok) throw new Error("Failed to fetch companies.");
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a company.");
      return;
    }

    setDeleting(id);
    try {
      const response = await fetch(`${API_URL}/advertisers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to delete company.");
      alert("Company deleted successfully");
      fetchCompanies();
    } catch (error) {
      alert(error.message);
    } finally {
      setDeleting(null);
    }
  };

  const filteredCompanies = companies.filter((company) =>
    Object.values(company).some((value) =>
      typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen flex flex-col items-center p-6  w-full">
      <motion.div 
        className="w-full flex flex-col items-center justify-center text-center p-10 mt-15"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font text-white drop-shadow-lg">Welcome to Our Advertising Platform</h1>
        <p className="text-xl mt-4 max-w-3xl text-gray-300">
        Get direct access to targeted locations and maximize your reach with cost-effective advertising solutions. Connect with the right audience in real-time and grow your business.
        </p>
      </motion.div>


      

      {/* Benefits Section */}
      <div className="w-full flex flex-col justify-center items-center p-10 text-white mt-0">
      <motion.div 
          className="w-full flex flex-col items-center justify-center text-center p-5"
          initial={{ opacity: 0, y:150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-bold text-center mb-8 text-white">
            Why Advertise with Us?
          </h2>
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          {[
            { title: "Direct Customer Reach", text: "Advertise directly to potential customers in your target location with precision." },
            { title: "Real-Time Analytics", text: "Track performance and optimize your campaigns for better engagement and conversions." },
            { title: "Cost-Effective Marketing", text: "Maximize your ad spend with high-quality leads at competitive pricing." },
            { title: "Easy Location Targeting", text: "Get direct access to targeted locations through our platform for precise marketing." }
          ].map((benefit, index) => (
            <div key={index} className="bg-black text-white p-8 rounded-lg shadow-lg border-t-4 border-yellow-300 text-center">
              <h3 className="text-3xl font-bold text-yellow-200 flex items-center justify-center gap-2">{benefit.title}</h3>
              <p className="text-lg text-gray-300">{benefit.text}</p>
            </div>
          ))}
        </div>
        </motion.div>
      </div>

      {/* Search Box Below Benefit Section */}
      <div className="w-full max-w-4xl p-3 flex items-center shadow-lg rounded-full border border-white relative -top-4">
  <input
    type="text"
    placeholder="Search anything"
    className="w-full p-2 rounded-full text-white focus:outline-none bg-transparent"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button className="p-2 rounded-full ml-2 border border-white hover:border-yellow-500 transition bg-white">
    <FiSearch size={20} className="text-yellow-500" />
  </button>
</div>


       {/* Company Listings */}
       <section className="p-10 w-full max-w-7xl">
        <h2 className="text-4xl font-bold mb-8 text-yellow-400 text-center">Company Listings</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading ? (
          <p className="text-gray-400 text-center">Loading companies...</p>
        ) : filteredCompanies.length === 0 ? (
          <p className="text-gray-400 text-center">No companies found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {filteredCompanies.map((company) => (
              <motion.div 
              key={company._id} 
              className="bg-[#2A2A2A] p-8 shadow-lg rounded-xl text-white hover:shadow-2xl transform transition duration-300 hover:scale-102 border border-yellow-500"
              whileHover={{ scale: 1.07 }}
            >
                 <h3 className="text-3xl font-bold text-yellow-400 mb-4">{company.companyName}</h3>
                <p className="text-gray-300 text-lg"><strong className="text-yellow-300">Type of Ads:</strong> {company.typeOfProduction}</p>
                <p className="text-gray-300 text-lg"><strong className="text-yellow-300">Address:</strong> {company.address}</p>
                <p className="text-gray-300 text-lg"><strong className="text-yellow-300">Phone:</strong> {company.phoneNumber}</p>
                <p className="text-gray-300 text-lg"><strong className="text-yellow-300">Email:</strong> {company.email}</p>
                {user && user._id === company.owner && (
                  <div className="mt-6 flex space-x-4">
                    <Link to={`/advertiser/edit/${company._id}`} className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition">Edit</Link>
                    <button onClick={() => handleDelete(company._id)} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition" disabled={deleting === company._id}>{deleting === company._id ? "Deleting..." : "Delete"}</button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

//Advertise code change bg color and add photo