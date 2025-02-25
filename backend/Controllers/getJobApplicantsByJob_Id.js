const supabase = require("../config/supabaseClient");

const getJobApplicantsByJob_Id = async (req, res) => {
    try {
        let { id } = req.params;

        // Step 1: Fetch applicant IDs from appliedjobs table
        const { data: applicants, error: applicantsError } = await supabase
            .from("appliedjobs")
            .select("applicant_id")
            .eq("job_id", id);

        if (applicantsError) {
            return res.status(400).json({ error: applicantsError.message });
        }

        if (!applicants || applicants.length === 0) {
            return res.status(404).json({ message: "No applied jobs found" });
        }

        const applicantIds = applicants.map((app) => app.applicant_id);

        // Step 2: Fetch job seeker details using applicant IDs
        const { data: jobSeekers, error: jobSeekersError } = await supabase
            .from("job_seekers")
            .select("*")
            .in("id", applicantIds);

        if (jobSeekersError) {
            return res.status(400).json({ error: jobSeekersError.message });
        }

        return res.status(200).json({ jobSeekers });
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getJobApplicantsByJob_Id };
