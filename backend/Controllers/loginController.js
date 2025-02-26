const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Secret key for signing JWT (store this in environment variables in production)
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Function to authenticate user (Job Seeker or Recruiter)
const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;

  // Validate input
  if (!email || !password || !userType) {
    return res.status(400).json({ message: 'Email, password, and user type are required' });
  }

  // Ensure valid userType
  if (userType !== 'jobSeeker' && userType !== 'recruiter') {
    return res.status(400).json({ message: 'Invalid user type' });
  }

  // Determine the correct table
  const table = userType === 'jobSeeker' ? 'job_seekers' : 'recruiters';

  try {
    console.log(`Checking user in table: ${table}, Email: ${email}`);

    // Fetch user by email from the correct table
    const { data, error } = await supabase
      .from(table)
      .select('id, email, password')
      .eq('email', email)
      .single(); // Ensure we get a single user

    if (error || !data) {
      console.log('User not found or wrong user type');
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare provided password with stored hash
    const isPasswordMatch = await bcrypt.compare(password, data.password);

    if (!isPasswordMatch) {
      console.log('Incorrect password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      userId: data.id,
      email: data.email,
      userType: userType, // Pass userType as part of the payload
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour

    // Return the token and user details to the frontend (no cookie set)
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: data.id, email: data.email, userType },
    });

  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { loginUser };
