import React, { useState } from "react";

const NewPremiumUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const plans = [
    { name: "Basic", price: "₹100/month", image: "https://c1.wallpaperflare.com/preview/94/768/1012/vertical-golden-metal-metallized.jpg", features: ["✔️ No Ads", "✔️ Basic Insights"] },
    { name: "Standard", price: "₹200/month", image: "https://t3.ftcdn.net/jpg/01/04/29/98/360_F_104299843_wGivOQEUpGNO7TrISPP5S1QR7JqOo4Aa.jpg", features: ["✔️ Advanced Insights", "✔️ Job Recommendations"] },
    { name: "Premium", price: "₹500/month", image: "https://c1.wallpaperflare.com/preview/94/768/1012/vertical-golden-metal-metallized.jpg", features: ["✔️ Priority Support", "✔️ All Features"] },
  ];

  const handleActivate = async (plan) => {
    try {
      setLoading(true);
      setError(null);

      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || !storedUser.id) {
        throw new Error("User not found. Please log in again.");
      }
      console.log(storedUser)
      const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, number: storedUser.id ,email:storedUser.email}),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      window.location.href = data.checkoutUrl;

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white p-8 mt-20">
      <div className="flex gap-6 flex-wrap justify-center">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="w-80 shadow-lg rounded-2xl p-6 flex flex-col items-center transition-transform transform hover:scale-105 bg-gray-50"
          >
            <img
              src={plan.image}
              alt={plan.name}
              className="w-24 h-24 rounded-full shadow-md mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">{plan.name}</h2>
            <p className="text-lg text-gray-600">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-center">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-gray-700 text-sm">{feature}</li>
              ))}
            </ul>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600"
              onClick={() => handleActivate(plan)}
              disabled={loading}
            >
              {loading ? "Processing..." : "Activate"}
            </button>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
  
};

export default NewPremiumUser;