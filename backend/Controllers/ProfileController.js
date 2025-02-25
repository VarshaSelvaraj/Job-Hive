const supabase = require("../config/supabaseClient");

// Get job seeker profile by email
const getProfile = async (req, res) => {
  try {
    const { email } = req.params;

    const { data, error } = await supabase
      .from("job_seekers")
      .select("*")
      .eq("email", email)
      .single(); // Get a single user profile

    if (error) {
      console.error("Supabase Error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Unexpected Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update job seeker profile
const updateProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const updatedData = req.body; // Form data from frontend

    const { data, error } = await supabase
      .from("job_seekers")
      .update(updatedData)
      .eq("email", email)
      .select("*")
      .single();

    if (error) {
      console.error("Supabase Error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", profile: data });
  } catch (err) {
    console.error("Unexpected Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getProfile, updateProfile };
