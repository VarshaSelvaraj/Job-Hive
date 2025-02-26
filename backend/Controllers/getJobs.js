const supabase = require("../config/supabaseClient");

const getJobs = async (req, res) => {
  try {
    // Fetch all jobs from the "jobs_data" table
    const { data, error } = await supabase.from("jobs_data").select("*");

    if (error) {
      console.error("Supabase Error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ jobs: data });
  } catch (err) {
    console.error("Unexpected Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getJobs;
