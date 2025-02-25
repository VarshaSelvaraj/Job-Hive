import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./components/Home";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import JobDetailsView from "./components/JobDetailsView";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SeekerProfile from "./pages/SeekerProfile";
import MainNavbar from "./components/MainNavbar";
import Navbar from "./components/Navbar";
import RecruiterNavBar from "./components/RecruiterNavBar";
import PremiumPage from "./components/PremiumPage";
import NewPremiumUser from "./components/NewPremiumUser";
import PremiumContent from "./components/PremiumContent";
import HrProfile from "./components/HrProfile";
import AddJobForm from "./components/AddJobForm";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; 
import RecruiterDashBoard from "./components/RecruiterDashBoard";

// Define stripePromise
const stripePromise = loadStripe("your-publishable-key-here");

function App() {
    const [user, setUser] = useState(null);

    // Check for user authentication
    useEffect(() => {
        const userDetails = localStorage.getItem("user");
        if (userDetails) {
            setUser(JSON.parse(userDetails));
        }
    }, []);

    // Function to handle login
    const handleLogin = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData); // Update state immediately
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null); 
    };

    return (
        <>
        <BrowserRouter>
            {/* Render Navbar based on user type */}
            {!user ? (
                <Navbar />
            ) : user.usertype === "recruiter" ? (
                <RecruiterNavBar logout={handleLogout} />
            ) : (
                <MainNavbar logout={handleLogout} />
            )}

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/jobs' element={<Jobs />} />
                <Route path='/about' element={<About />} />
                <Route path='/jobs/:job_id' element={<JobDetailsView />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login onLogin={handleLogin} />} />
                <Route path='/seekerprofile' element={<SeekerProfile />} />
                <Route path='/premium' element={<PremiumPage />} />
                {/* Wrap only the Premium Page requiring Stripe inside Elements */}
                <Route 
                    path='/getpremium' 
                    element={
                        <Elements stripe={stripePromise}>
                            <NewPremiumUser />
                        </Elements>
                    } 
                />
                <Route path='/haspremium' element={<PremiumContent />} />
                <Route path='/hrprofile' element={<HrProfile />} />
                <Route path='/addJob' element={<AddJobForm />} />
                <Route path="/dashboard" element={<RecruiterDashBoard />} />
            </Routes>
        </BrowserRouter>
        </>
        
    );
}

export default App;
