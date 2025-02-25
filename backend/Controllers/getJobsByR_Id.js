const supabase = require("../config/supabaseClient");

const getJobsByR_Id = async (req, res) => {
    try {
        // console.log("Request Params:", req.params); // Debugging log

        let { recruiter_id } = req.params;
        if (!recruiter_id) {
            return res.status(400).json({ error: "Recruiter ID is required" });
        }

        recruiter_id = parseInt(recruiter_id, 10);
        // console.log("Fetching jobs for recruiter_id:", recruiter_id);

        const { data, error } = await supabase
            .from("jobs_data")
            .select("*")
            .eq("recruiter_id", recruiter_id);

        if (error) {
            console.error("Supabase Fetch Error:", error);
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ jobs: data });
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getJobsByR_Id };
