const supabase = require("../config/supabaseClient");

const getJobs = async (req, res) => {
  try {
    const searchQuery = req.query.search ? req.query.search.toLowerCase().trim() : "";

    // If no search query, return all jobs
    if (!searchQuery) {
      const { data, error } = await supabase.from("jobs_data").select("*");

      if (error) {
        console.error("Supabase Error:", error.message);
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ jobs: data });
    }

    // Supabase Query: Search across multiple columns using ilike
    const { data, error } = await supabase
      .from("jobs_data")
      .select("*")
      .or(
        [
          `job_title.ilike.%${searchQuery}%`,
          `role.ilike.%${searchQuery}%`,
          `company.ilike.%${searchQuery}%`,
          `location.ilike.%${searchQuery}%`,
          `country.ilike.%${searchQuery}%`,
          `work_type.ilike.%${searchQuery}%`,
          `employment_type.ilike.%${searchQuery}%`,
          `job_portal.ilike.%${searchQuery}%`,
          `job_description.ilike.%${searchQuery}%`,
          `skills.ilike.%${searchQuery}%`
        ].join(',')
      );

    if (error) {
      console.error("Supabase Error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ jobs: data });
  } catch (err) {
    console.error("Unexpected Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getJobs;