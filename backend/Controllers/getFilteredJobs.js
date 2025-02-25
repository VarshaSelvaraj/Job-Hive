

const { supabase } = require("../config/supabaseClient");

// Get filtered jobs
const getFilteredJobs = async (req, res) => {
  try {
    const { location, jobType, experience, industry, skills, remote } = req.query;

    // Fetch all jobs from Supabase
    let { data: jobs, error } = await supabase.from("jobs_data").select("*");

    if (error) {
      return res.status(500).json({ error: "Error fetching jobs" });
    }

    // Apply filters
    let filteredJobs = jobs.filter((job) => {
      const jobDesc = job.job_description.toLowerCase(); // Convert to lowercase for case-insensitive matching

      return (
        (!location || jobDesc.includes(location.toLowerCase())) &&
        (!jobType || jobDesc.includes(jobType.toLowerCase())) &&
        (!experience || jobDesc.includes(experience.toLowerCase())) &&
        (!industry || jobDesc.includes(industry.toLowerCase())) &&
        (!skills ||
          skills
            .split(",")
            .every((skill) => jobDesc.includes(skill.toLowerCase()))) &&
        (!remote || (remote === "true" && jobDesc.includes("remote")))
      );
    });

    return res.status(200).json({ jobs: filteredJobs });
  } catch (error) {
    console.error("Error filtering jobs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getFilteredJobs };
