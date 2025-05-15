import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "/image/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  // ✅ Check authentication state dynamically
  const checkAuth = () => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setIsOpen(false);
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
<nav className="fixed top-0 left-0 w-full z-50 bg-black/80 text-white px-4 py-3 shadow-md backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] object-contain" />
          <span className="text-lg sm:text-xl font-bold">AdLinker</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white">
          <NavLink to="/" className="hover:text-gray-300">Home</NavLink>
          <NavLink to="/advertiser" className="hover:text-gray-300">Advertiser</NavLink>
          <NavLink to="/publisher" className="hover:text-gray-300">Publisher</NavLink>
          <NavLink to="/contact" className="hover:text-gray-300">Contact Us</NavLink>
        </ul>

        {/* Authentication Buttons */}
        <div className="hidden md:flex space-x-2">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/register">
                <button className="bg-[#FFD700] text-black px-4 py-2 rounded-md hover:bg-[#E6B800]">
                  Register
                </button>
              </NavLink>
              <NavLink to="/login">
                <button className="border border-[#FFD700] px-4 py-2 rounded-md text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                  Sign in
                </button>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black/90 z-50 transition-transform ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden flex flex-col items-center pt-20`}
      >
        <button className="absolute top-5 right-5 text-white" onClick={() => setIsOpen(false)}>
          <X size={32} />
        </button>

        <ul className="flex flex-col space-y-5 text-lg text-white">
          <NavLink to="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/advertiser" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Advertiser</NavLink>
          <NavLink to="/publisher" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Publisher</NavLink>
          <NavLink to="/contact" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Contact Us</NavLink>
        </ul>

        <div className="flex flex-col items-center space-y-4 mt-6 w-4/5">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-500 text-white w-full py-2 rounded-md text-center hover:bg-red-700">
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/register" className="w-full" onClick={() => setIsOpen(false)}>
                <button className="bg-[#FFD700] text-black w-full py-2 rounded-md text-center hover:bg-[#E6B800]">
                  Register
                </button>
              </NavLink>
              <NavLink to="/login" className="w-full" onClick={() => setIsOpen(false)}>
                <button className="border border-[#FFD700] w-full py-2 rounded-md text-[#FFD700] text-center hover:bg-[#FFD700] hover:text-black">
                  Sign in
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
