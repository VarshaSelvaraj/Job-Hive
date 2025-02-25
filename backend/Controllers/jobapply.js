const  supabase  = require("../config/supabaseClient");

// Apply for a Job
const appliedjob = async (req, res) => {
  try {
    const { email, applicant_id, job_id, username, phone, dob, education, skills, experience, languages, resume, declaration } = req.body;
console.log("email:", email);
    const { data, error } = await supabase
      .from("appliedjobs")
      .insert([{ email, applicant_id, job_id, username, phone, dob, education, skills, experience, languages, resume, declaration }]);

    if (error) throw error;
    
    res.status(201).json({ success: true, message: "Application submitted successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { appliedjob };