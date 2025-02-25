const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing

// Load environment variables
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Function to check if email exists
const emailExists = async (email) => {
  const { data, error } = await supabase
    .from('job_seekers') // Assuming you're checking the job seekers table first
    .select('email')
    .eq('email', email)
    .single(); // Use single to check if one record exists

  if (error) {
    console.error('Error checking email:', error);
    return null; // If there's an error, return null
  }

  return data; // If email exists, return the data
};

// Function to store Job Seeker
const storeJobSeeker = async (req, res) => {
  const { username, email, phone, password } = req.body;

  // Check if email already exists
  const existingUser = await emailExists(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already registered' });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds (strength)

  // Insert new user if email doesn't exist
  const { data, error } = await supabase
    .from('job_seekers')
    .insert([
      {
        username,
        email,
        phone,
        password: hashedPassword, // Store the hashed password
      },
    ]);

  if (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error storing Job Seeker data' });
  }

  return res.status(201).json({ message: 'Job Seeker created successfully', data });
};

// Function to store Recruiter
const storeRecruiter = async (req, res) => {
  const { username, email, phone, password, companyName, location } = req.body;

  // Check if email already exists
  const existingUser = await emailExists(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already registered' });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds (strength)

  // Insert new recruiter if email doesn't exist
  const { data, error } = await supabase
    .from('recruiters')
    .insert([
      {
        username,
        email,
        phone,
        password: hashedPassword, // Store the hashed password
        company_name: companyName,
        location,
      },
    ]);

  if (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error storing Recruiter data' });
  }

  return res.status(201).json({ message: 'Recruiter created successfully', data });
};

// Function to get recruiter details by email

const getRecruiterDetailsById = async (req, res) => {
  try {
    const { id } = req.params; // Get id from route params

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const recruiterId = parseInt(id); // Convert id to number

    // Fetch recruiter details from Supabase
    const { data, error } = await supabase
      .from("recruiters")
      .select("id, username, email, phone, company_name, location")
      .eq("id", recruiterId)
      .single(); // Ensures only one record is returned

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ message: "Database error", error });
    }

    if (!data) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    console.log("Recruiter Data:", data);
    return res.status(200).json(data);
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Ensure correct route mapping


module.exports = { storeJobSeeker, storeRecruiter,getRecruiterDetailsById};
