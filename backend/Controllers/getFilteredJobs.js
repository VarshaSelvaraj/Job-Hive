// const { supabase } = require("../config/supabaseClient"); // Supabase client instance

// exports.getFilteredJobs = async (req, res) => {
//   try {
//     let { location, jobType, experience, industry, skills, remote, search } = req.query;
//     let query = supabase.from("jobs").select("*");

//     // Filtering by location
//     if (location) {
//       query = query.ilike("job_location", `%${location}%`); // Case-insensitive match
//     }

//     // Filtering by job type
//     if (jobType) {
//       query = query.eq("job_type", jobType);
//     }

//     // Filtering by experience
//     if (experience) {
//       query = query.ilike("job_description", `%${experience}%`); // Search in job description
//     }

//     // Filtering by industry
//     if (industry) {
//       query = query.ilike("company_industry", `%${industry}%`);
//     }

//     // Filtering by remote jobs
//     if (remote === "true") {
//       query = query.eq("is_remote", true);
//     }

//     // Filtering by skills
//     if (skills) {
//       const skillsArray = skills.split(",");
//       query = query.or(
//         skillsArray.map((skill) => `job_description.ilike.%${skill}%`).join(",")
//       ); // Check if job description contains any skill
//     }

//     // **Full-Text Search in Job Description**
//     if (search) {
//       query = query.textSearch("job_description", search, {
//         type: "websearch",
//       });
//     }

//     // Execute query
//     let { data: jobs, error } = await query;

//     if (error) {
//       return res.status(400).json({ success: false, error: error.message });
//     }

//     res.json({ success: true, jobs });
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Server Error" });
//   }
// };

const { supabase } = require("../config/supabaseClient");

// Get filtered jobs
const getFilteredJobs = async (req, res) => {
  try {
    const { location, jobType, experience, industry, skills, remote } = req.query;

    // Fetch all jobs from Supabase
    let { data: jobs, error } = await supabase.from("jobs").select("*");

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
