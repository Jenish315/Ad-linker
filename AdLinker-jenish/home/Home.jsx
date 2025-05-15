import { useState } from "react";
import FeatureSection from "../component/FeatureSection";
import Footer from "../component/Footer";
import FAQ from "../component/footer/FAQ";
import { motion } from "framer-motion";

const image = "/lo.png"; // ✅ Correct way to reference public folder images

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleExploreMore = () => {
    if (!isLoggedIn) {
      alert("Please register or log in to explore more.");
    } else {
      alert("Loading more content...");
    }
  };

  return (
    <div className="text-white px-6 py-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between min-h-screen gap-6">
        {/* Left Content */}
        <div className="max-w-lg text-left pl-6 flex-1">
          <h1 className="text-5xl md:text-6xl font-extrabold">Welcome to AdLinker</h1>
          <p className="text-lg md:text-xl mt-3">
            Monetize your spaces by connecting with advertisers. Whether you're a business or an individual, we make advertising effortless.
          </p>

          {/* CTA Button */}
          <div className="mt-6">
            <button
              type="button"
              className="bg-[#ffcc00] text-black py-3 px-6 text-lg font-semibold rounded-lg hover:bg-[#e6b800] transition-all"
              onClick={handleExploreMore}
            >
              Explore More
            </button>
          </div>
        </div>

        {/* Right Content: Image */}
        <div className="flex-1 flex justify-center">
          <motion.img
            src={image}
            alt="AdLinker"
            className="w-full max-w-xs md:max-w-md object-contain"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* How It Works Section (Updated to match "Why Choose Us") */}
      {/* How It Works Section (Updated to match "Why Choose Us" with more content) */}
<div className="mt-16 text-center">
  <h2 className="text-5xl font-bold text-white">How It Works</h2>
  <p className="text-2xl text-gray-400 mt-2">
    AdLinker connects advertisers with spaces for their ads in 4 simple steps.
  </p>

  {/* 2x2 Grid Layout - Matching "Why Choose Us" with Expanded Content */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-5xl mx-auto mt-8">
    <div className="bg-[#2A2A2A] text-white p-5 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
      <h3 className="text-3xl font-semibold">1. List Your Space</h3>
      <p className="mt-2 text-base text-gray-400">
        Sign up and add details about your available advertising space, whether it's physical (billboards, store displays).  
        Upload images, set pricing, and provide details to attract potential advertisers who need visibility.
      </p>
    </div>
    <div className="bg-[#2A2A2A] text-white p-5 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
      <h3 className="text-2xl font-semibold">2. Connect with Advertisers</h3>
      <p className="mt-2 text-base text-gray-400">
        Advertisers can browse available spaces and select the best location that aligns with their campaign needs.  
        You’ll receive booking requests, and you can approve or negotiate terms directly through the platform.
      </p>
    </div>
    <div className="bg-[#2A2A2A] text-white p-5 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
      <h3 className="text-2xl font-semibold">3. Manage Your Ads</h3>
      <p className="mt-2 text-base text-gray-400">
        Stay in control with a powerful dashboard that allows you to track bookings, and update your space details.  
        Access real-time analytics to see ad performance and optimize your listings for better results.
      </p>
    </div>
    <div className="bg-[#2A2A2A] text-white p-5 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
      <h3 className="text-2xl font-semibold">4. Earn Money</h3>
      <p className="mt-2 text-base text-gray-400">
      Unlike other platforms, AdLinker does not take commissions, ensuring you keep 100% of your earnings. Once a deal is confirmed, you can discuss payment terms directly with advertisers.
      </p>
    </div>
  </div>
</div>


      {/* Why Choose Us Section */}
      

      {/* Feature Section */}
      <FeatureSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;