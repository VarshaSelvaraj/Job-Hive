import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./components/Home";
import Jobs from "./pages/Jobs";

import JobDetailsView from "./components/JobDetailsView";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SeekerProfile from "./components/SeekerProfile";
import MainNavbar from "./components/MainNavbar";
import Navbar from "./components/Navbar";
import RecruiterNavBar from "./components/RecruiterNavBar";
import PremiumPage from "./components/PremiumPage";
import NewPremiumUser from "./components/NewPremiumUser";
import PremiumContent from "./components/PremiumContent";
import AddJobForm from "./components/AddJobForm";
import ApplyJob from "./components/ApplyJob";
import EditJob from "./components/EditJob";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; 
import RecruiterDashBoard from "./components/RecruiterDashBoard";

// Load Stripe key (Replace with actual key)
const stripePromise = loadStripe("your-publishable-key-here");

// 🔹 Protected Route Component
const ProtectedRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem("user"));  // Get user from localStorage
    const token = localStorage.getItem("token");  // Get token from localStorage

    // Check if both user and token exist
    return user && token ? element : <Navigate to="/login" replace />;
};

function App() {
    const [user, setUser] = useState(null);

    // 🔹 Check if user is logged in
    useEffect(() => {
        const userDetails = localStorage.getItem("user");
        if (userDetails) {
            try {
                const parsedUser = JSON.parse(userDetails);
                console.log("User data from localStorage:", parsedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    // 🔹 Handle Login
    const handleLogin = (userData) => {
        console.log("Logging in user:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    // 🔹 Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
        setUser(null); 
    };

    return (
        <Router>
            {/* 🔹 Navbar based on user type */}
            {!user ? (
                <Navbar />
            ) : user.userType === "recruiter" ? (
                <RecruiterNavBar logout={handleLogout} />
            ) : (
                <MainNavbar logout={handleLogout} />
            )}

            <Routes>
                {/* 🔹 Public Routes */}
                <Route path='/login' element={<Login onLogin={handleLogin} />} />
                <Route path='/signup' element={<Signup />} />

                {/* 🔹 Protected Routes */}
                <Route path='/' element={<Home />} />
                <Route path='/jobs' element={<ProtectedRoute element={<Jobs />} />} />
                <Route path='/jobs/:job_id' element={<ProtectedRoute element={<JobDetailsView />} />} />
                <Route path="/editJob/:id" element={<ProtectedRoute element={<EditJob />} />} />
                <Route path='/seekerprofile' element={<ProtectedRoute element={<SeekerProfile />} />} />
                <Route path='/ApplyJob/:jobid' element={<ProtectedRoute element={<ApplyJob />} />} />
                <Route path='/premium' element={<ProtectedRoute element={<PremiumPage />} />} />
                <Route path='/haspremium' element={<ProtectedRoute element={<PremiumContent />} />} />
                <Route path='/addJob' element={<ProtectedRoute element={<AddJobForm />} />} />
                <Route path='/dashboard' element={<ProtectedRoute element={<RecruiterDashBoard />} />} />
                <Route path="/seeker-profile/:id" element={<ProtectedRoute element={<SeekerProfile />} />} />

                {/* 🔹 Profile based on user type */}
                <Route path='/profile' element={
                    <ProtectedRoute element={user?.userType === "recruiter" ? <RecruiterDashBoard /> : <SeekerProfile />} />
                } />

                {/* 🔹 Stripe Checkout - Protect this route too */}
                <Route 
                    path='/getpremium' 
                    element={
                        <Elements stripe={stripePromise}>
                            <ProtectedRoute element={<NewPremiumUser />} />
                        </Elements>
                    } 
                />

                {/* 🔹 Redirect invalid routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
