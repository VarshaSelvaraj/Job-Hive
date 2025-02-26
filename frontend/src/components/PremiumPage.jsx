import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PremiumPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 

    const checkPremiumStatus = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user")); 
        if (!storedUser || !storedUser.id) {
          return navigate("/getpremium"); 
        }

        
        console.log(storedUser.id)
        const response = await axios.get(`http://localhost:5000/check-premium/${storedUser.id}`, {
          withCredentials: true,
        });
        console.log(response)
        if (isMounted) {
          if (response.data.isPremium) {
            navigate("/haspremium"); 
          } else {
            navigate("/getpremium"); 
          }
        }
      } catch (err) {
        console.error("Error checking premium status:", err);
        if (isMounted) {
          setError("Failed to check premium status");
          navigate("/getpremium");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkPremiumStatus();

    return () => {
      isMounted = false; 
    };
  }, [navigate]);

  if (loading) return <p>Checking premium status...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Welcome to Premium Page</h1>
      <p>Only premium users can see this content.</p>
    </div>
  );
};

export default PremiumPage;