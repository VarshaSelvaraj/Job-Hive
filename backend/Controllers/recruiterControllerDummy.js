const supabase = require("../config/supabaseClient");

// Get Recruiter Profile
const getRecruiterProfile = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("recruiter_profiles")
            .select("*")
            .eq("email", req.query.email)  // Assuming email is used to fetch the profile
            .single();

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const insertProfile = async (req, res) => {
    try {
        console.log("Received insert request:", req.body); // Debug log

        const {
            firstName,  // Fixing field names to match request body
            lastName,
            email,
            phone,
            profilePhoto,
            linkedin,
            twitter,
            industry,
            companyName,
            location,
            website,
            university,
            specialization,
            graduationYear
        } = req.body;

        const { error } = await supabase
            .from("recruiter_profiles")
            .insert([{
                first_name: firstName, // Mapping request fields to DB column names
                last_name: lastName,
                email,
                phone,
                profile_photo: profilePhoto,
                linkedin,
                twitter,
                industry,
                company_name: companyName,
                location,
                website,
                university,
                specialization,
                graduation_year: graduationYear
            }]);

        if (error) {
            console.error("Error inserting profile:", error);
            throw error;
        }

        res.status(200).json({ message: "Profile inserted successfully!" });
    } catch (error) {
        console.error("Insert Profile Error:", error);
        res.status(500).json({ error: error.message });
    }
};



module.exports = { getRecruiterProfile, insertProfile };