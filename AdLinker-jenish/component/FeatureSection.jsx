const FeatureSection = () => {
    const features = [
      {
        title: "🚀 Cutting-Edge Ad Technology",
        description: "Leverage our advanced ad-serving technology, ensuring high-speed, precise targeting, and AI-driven optimization for maximum ROI.",
        image: "../image/logo1.png",
      },
      {
        title: "🌎 Global Reach with Premium Traffic",
        description: "Access high-quality traffic from over 248 geographies with industry-leading anti-fraud protection, ensuring real engagement and conversions.",
        image: "../image/logo2.png",
      },
      {
        title: "💰 High-Performing Monetization",
        description: "Maximize your revenue with a wide variety of ad formats, including Popunder, Native Ads, and Social Bar, tailored to boost earnings effortlessly.",
        image: "../image/logo3.png",
      },
      {
        title: "📊 24/7 Support & Smart Automation",
        description: "Get expert assistance around the clock and utilize powerful automation tools to optimize campaigns, track performance, and scale efficiently.",
        image: "../image/logo4.png",
      },
    ];

    return (
      <div className="py-16 px-8 ">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-[#2A2A2A] text-white p-5 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105"
              >
              <img 
                src={feature.image} 
                alt={feature.title} 
                className="w-22 h-22 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default FeatureSection;
