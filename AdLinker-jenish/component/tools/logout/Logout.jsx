

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);  // ✅ Use logout function
  const [message, setMessage] = useState(""); // ✅ State for logout message

  useEffect(() => {
    handleLogout(); // ✅ Call logout function from context
    setMessage("Logout Successful!"); // ✅ Show success message
    
    // ✅ Wait 2 seconds, then redirect to Home page
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate, handleLogout]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg text-green-600">{message}</p>
    </div>
  );
};

export default Logout;