const supabase = require("../config/supabaseClient");

// Get applied jobs with job details by job seeker ID
const getAppliedJobsByS_Id = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Job Seeker ID is required" });
        }

        let applicant_id = parseInt(id, 10);

        // Fetch applied jobs
        const { data: appliedJobs, error: appliedError } = await supabase
            .from("appliedjobs")
            .select("job_id")
            .eq("applicant_id", applicant_id);

        if (appliedError) {
            console.error("Supabase Fetch Error for applied jobs:", appliedError);
            return res.status(500).json({ error: appliedError.message });
        }

        if (!appliedJobs || appliedJobs.length === 0) {
            return res.status(200).json({ jobs: [] });
        }

        // Extract unique job IDs
        const jobIds = appliedJobs.map(job => job.job_id);

        // Fetch job details from jobs_data
        const { data: jobDetails, error: jobError } = await supabase
            .from("jobs_data")
            .select("*")
            .in("id", jobIds); // Match job_id with jobs_data id

        if (jobError) {
            console.error("Supabase Fetch Error for job details:", jobError);
            return res.status(500).json({ error: jobError.message });
        }

        res.status(200).json({ jobs: jobDetails });

    } catch (err) {
        console.error("Server Error for applied jobs:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getAppliedJobsByS_Id };
