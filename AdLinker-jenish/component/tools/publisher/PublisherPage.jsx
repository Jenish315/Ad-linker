// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// export default function Publisher() {
//   const [companies, setCompanies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [deleting, setDeleting] = useState(null);
//   const [user, setUser] = useState(null);

//   const API_URL = "http://localhost:5000/api";

//   useEffect(() => {
//     const stoyellowUser = localStorage.getItem("user");
//     if (stoyellowUser) {
//       setUser(JSON.parse(stoyellowUser));
//     } else {
//       setUser(null);
//     }
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch(`${API_URL}/publishers`);
//       if (!response.ok) throw new Error("Failed to fetch companies.");
//       const data = await response.json();
//       setCompanies(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You must be logged in to delete a company.");
//       return;
//     }

//     setDeleting(id);
//     try {
//       const response = await fetch(`${API_URL}/publishers/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) throw new Error("Failed to delete company.");
//       alert("Company deleted successfully");
//       fetchCompanies();
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setDeleting(null);
//     }
//   };

//   const filteyellowCompanies = companies.filter((company) =>
//     (company.area || "").toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const companiesWithDeleteAccess = user
//     ? filteyellowCompanies.map((company) => ({
//         ...company,
//         canDelete: user._id === company.createdBy,
//       }))
//     : filteyellowCompanies;
  
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <section className="p-6 max-w-4xl w-full">
//         <header className="text-center mb-6 mt-14">
//           <h1 className="text-3xl font-bold">Company Directory</h1>
//           <p className="text-gray-600">
//             Browse all available companies. <br />
//             <strong>Login to add or manage your own.</strong>
//           </p>
//         </header>

//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="Search by company name..."
//             className="w-full p-2 border rounded-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <h2 className="text-2xl font-semibold mb-4">Company Listings</h2>

//         {error && <p className="text-yellow-600">{error}</p>}
//         {loading ? (
//           <p className="text-gray-600">Loading companies...</p>
//         ) : companiesWithDeleteAccess.length === 0 ? (
//           <p className="text-gray-600">No companies found.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {companiesWithDeleteAccess.map((company) => (
//               <div
//                 key={company._id}
//                 className="p-4 shadow-md rounded-lg"
//               >
//                 <h3 className="text-xl font-semibold">{company.companyName}</h3>

//                 {company.image && (
//                   <img
//                     src={company.image}
//                     alt={company.companyName}
//                     className="w-full h-40 object-cover rounded-lg"
//                   />
//                 )}

//                 <p className="text-gray-700">
//                   <strong>Location:</strong> {company.location}
//                 </p>
//                 <p className="text-gray-700">
//                   <strong>Area:</strong> {company.area}
//                 </p>

//                 {company.size && (
//                   <>
//                     <p className="text-gray-700">
//                       <strong>Size Length:</strong> {company.size[0].length  }
//                     </p>
//                     <p className="text-gray-700">
//                       <strong>Size Width:</strong> {company.size[0].width}
//                     </p>
//                   </>
//                 )}

//                 <p className="text-gray-700">
//                   <strong>Price per Month:</strong> {company.pricePerMonth}
//                 </p>
//                 <p className="text-gray-700">
//                   <strong>Traffic:</strong> {company.traffic}
//                 </p>

//                 {company.canDelete && (
//                   <div className="mt-4 flex space-x-2">
//                     <Link
//                       to={`/publisher/edit/${company._id}`}
//                       className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition"
//                     >
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(company._id)}
//                       className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-700 transition"
//                       disabled={deleting === company._id}
//                     >
//                       {deleting === company._id ? "Deleting..." : "Delete"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {user && user._id ? (
//           <div className="text-center mt-6">
//             <Link
//               to="/publisher/form"
//               className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
//             >
//               Add Company
//             </Link>
//           </div>
//         ) : null}
//       </section>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

export default function PublisherPage() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [user, setUser] = useState(null);

  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    const stoyellowUser = localStorage.getItem("user");
    if (stoyellowUser) {
      setUser(JSON.parse(stoyellowUser));
    } else {
      setUser(null);
    }
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/publishers`);
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
      const response = await fetch(`${API_URL}/publishers/${id}`, {
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

  const filteyellowCompanies = companies.filter((company) =>
    Object.entries(company).some(([key, value]) =>
      (typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof value === "number" && value.toString().includes(searchTerm)) ||
      (Array.isArray(value) && value.some(item => typeof item === "object" && Object.values(item).some(v => v.toString().includes(searchTerm))))
    )
  );

  return (
    <div className="min-h-screen flex flex-col items-center p-6 w-full text-white">
      {/* Hero Section */}
      <motion.div 
        className="w-full flex flex-col items-center justify-center text-center p-10 mt-15"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">Welcome to the Publisher Platform</h1>
        <p className="text-xl mt-4 max-w-3xl text-gray-300">
          Manage your listings, reach potential advertisers, and grow your business efficiently with our advanced tools.
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
          <h2 className="text-5xl font-extrabold text-center mb-8 text-white">
            Why Publisher with Us?
          </h2>
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
  {[
    { title: "Monetization Opportunities", text: "Maximize your revenue with our diverse monetization options tailoyellow for publishers." },
    { title: "Targeted Audience", text: "Gain access to a well-defined audience to enhance your reach and engagement." },
    { title: "Advanced Analytics", text: "Track performance metrics to optimize content strategy and maximize earnings." },
    { title: "Seamless Integration", text: "Easily integrate our solutions with your platform for a smooth publishing experience." }
  ].map((benefit, index) => (
    <div key={index} className="bg-black text-white p-8 rounded-lg shadow-lg border-t-4 border-yellow-600">
      <h3 className="text-3xl font-bold text-yellow-400 flex items-center gap-2 justify-center text-center">{benefit.title}</h3>
      <p className="text-lg text-gray-300 text-center">{benefit.text}</p>
    </div>
  ))}
</div>

 </motion.div>
</div>

      {/* Search Bar */}
      <div className="w-full max-w-4xl p-3 flex items-center shadow-lg rounded-full border border-white">
        <input
          type="text"
          placeholder="Search for companies..."
          className="w-full p-2 rounded-full text-white bg-transparent focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="p-2 rounded-full ml-2 border border-white hover:border-yellow-500 transition bg-white">
          <FiSearch size={20} className="text-yellow-500" />
        </button>
      </div>

      {/* Company Listings */}
      <section className="p-10 w-full max-w-4xl">
        <h2 className="text-4xl font-bold mb-8 text-yellow-400 text-center">Company Listings</h2>
        {error && <p className="text-yellow-500 text-center">{error}</p>}
        {loading ? (
          <p className="text-gray-400 text-center">Loading companies...</p>
        ) : filteyellowCompanies.length === 0 ? (
          <p className="text-gray-400 text-center">No companies found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-15 w-full">
            {filteyellowCompanies.map((company) => (
              <motion.div 
                key={company._id} 
                className="bg-[#2A2A2A] p-4 shadow-lg rounded-xl text-white hover:shadow-2xl transform transition duration-300 hover:scale-102 border border-yellow-500"
                whileHover={{ scale: 1.07 }}
              >
                <h3 className="text-3xl font-bold text-yellow-400 mb-4">{company.companyName}</h3>
                {company.image && (
                  <img
                    src={company.image}
                    alt={company.companyName}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <p className="text-gray-300 text-lg"><strong className="text-yellow-300">Location:</strong> {company.location}</p>
                <p className="text-gray-300 text-lg"><strong className="text-yellow-300">Area:</strong> {company.area}</p>
                <p className="text-gray-300 text-lg"><strong className="text-yellow-300">Size Length:</strong> {company.size[0].length}</p>
                <p className="text-gray-300 text-lg"><strong className="text-yellow-300">Size Width:</strong> {company.size[0].width}</p>
                <p className="text-gray-300 text-lg"><strong className="text-yellow-300">Price per Month:</strong> {company.pricePerMonth}</p>
                <p className="text-gray-300 text-lg"><strong className="text-yellow-300">Traffic:</strong> {company.traffic}</p>
                {user && user._id === company.createdBy && (
                  <div className="mt-6 flex space-x-4">
                    <Link to={`/publisher/edit/${company._id}`} className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">Edit</Link>
                    <button onClick={() => handleDelete(company._id)} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition" disabled={deleting === company._id}>{deleting === company._id ? "Deleting..." : "Delete"}</button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      {user && user._id ? (
          <div className='text-center mt-6'>
            <Link to='/publisher/form' className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition'>
              Add Company
            </Link>
          </div>
        ) : null}
      </section>
    </div>
  );
}
