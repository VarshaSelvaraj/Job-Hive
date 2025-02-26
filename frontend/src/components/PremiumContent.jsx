import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PremiumContent = () => {
  const [status, setStatus] = useState({
    isPremium: true,  
    message: "You are a premium provider and will receive all notifications faster than others!",
  });

  const navigate = useNavigate(); 

  
  const goHome = () => {
    navigate("/main"); 
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Premium Status</h1>
        <p className="text-lg text-gray-600">{status.message}</p>
        {status.isPremium && (
          <div>
            <p className="mt-4 text-green-500">✅ You are a premium provider!</p>
            <button
              onClick={goHome}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumContent;