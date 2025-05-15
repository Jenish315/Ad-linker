import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is AdLinker?",
    answer: "AdLinker connects advertisers with businesses and individuals looking to monetize their spaces through ad placements.",
  },
 
  {
    question: "Is AdLinker free to use?",
    answer: "Yes! Listing your space is free, and you earn directly from advertisers with no hidden fees.",
  },
  {
    question: "How do I list my space for ads?",
    answer: "After registering, click on 'Publisher', then tap the 'Add' button to list your space with details",
  },

  {
    question: "Can I upload photos of my space?",
    answer: "Yes! Upload high-quality images to showcase your space. Listings with photos get more bookings.",
  },

  {
    question: "How do I receive payments from advertisers?",
    answer: "Advertisers and publishers negotiate the price and payment method directly based on mutual agreement.",
  },
 
  
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white py-20 px-8">
      <h2 className="text-5xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="max-w-5xl mx-auto space-y-5">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[#2A2A2A] rounded-lg shadow-lg">
            <button
              className="w-full text-left px-8 py-6 text-2xl font-semibold flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-4xl text-white transition-transform duration-300">
                {openIndex === index ? (
                  <span className="rotate-0">−</span> // Minus icon
                ) : (
                  <span className="rotate-90">+</span> // Plus icon
                )}
              </span>
            </button>

            <motion.div
              className={`overflow-hidden ${openIndex === index ? "block" : "hidden"}`}
              initial={false}
              animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-8 pb-6 text-lg text-gray-400">{faq.answer}</div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;