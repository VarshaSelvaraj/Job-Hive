const supabase = require("../config/supabaseClient");

const postJob = async (req, res) => {
    try {
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
        } = req.body;

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
                    skills,
                    company,
                    company_profile,
                },
            ]);

        if (error) {
            console.error("Supabase Insert Error:", error);
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({ message: "Job posted successfully", data });
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { postJob };