import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2A2A2A] text-white py-8 w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
          
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold">About AdLinker</h2>
            <p className="text-gray-400 text-sm mt-2">
              AdLinker is your one-stop platform for high-performance advertising and monetization.
              Join us to maximize revenue and reach global audiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="text-gray-400 text-sm mt-2 space-y-1">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">Support</a></li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h2 className="text-lg font-semibold">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-white hover:text-black transition duration-300">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-white hover:text-black transition duration-300">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-white hover:text-black transition duration-300">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-white hover:text-black transition duration-300">
                <FaLinkedinIn size={16} />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-white hover:text-black transition duration-300">
                <FaYoutube size={16} />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-white hover:text-black transition duration-300">
                <FaGithub size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-600 pt-4 w-full">
          &copy; 2024 AdLinker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
