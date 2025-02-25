const supabase = require("../config/supabaseClient");

const postJob = async (req, res) => {
    try {
        console.log("Received Data from frontend:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "No data received. Check the request body." });
        }

        const {
            job_title,
            role,
            experience,
            qualifications,
            salary_range,
            location,
            country,
            work_type,
            employment_type,
            job_portal,
            job_description,
            skills,
            company,
            company_profile,
            recruiter_id,  // New field
            recruiter_email // New field
        } = req.body;

        // Ensure recruiter data is included
        if (!recruiter_id || !recruiter_email) {
            return res.status(400).json({ error: "Recruiter information missing. Please login again." });
        }

        const formattedSkills = Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim());

        // Insert into Supabase
        const { data, error } = await supabase
            .from("jobs_data")
            .insert([
                {
                    job_title,
                    role,
                    experience,
                    qualifications,
                    salary_range,
                    location,
                    country,
                    work_type,
                    employment_type,
                    job_portal,
                    job_description,
                    skills: formattedSkills,
                    company,
                    company_profile,
                    recruiter_id,   // Storing recruiter ID
                    recruiter_email // Storing recruiter email
                }
            ])
            .select();

        if (error) {
            console.error("Supabase Insert Error:", error);
            return res.status(500).json({ error: error.message, details: error });
        }

        res.status(201).json({ message: "Job posted successfully", data });
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { postJob };
