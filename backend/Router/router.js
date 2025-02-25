const getJobs = require('../Controllers/getJobs');
const getJobById = require('../Controllers/getJobById');
const express = require('express');
const { getFilteredJobs } = require('../Controllers/getFilteredJobs');
const { storeJobSeeker, storeRecruiter } = require('../Controllers/userController');
const { loginUser } = require('../Controllers/loginController');
const { checkPremium, createCheckoutSession } = require("../Controllers/Premiumdata");
const { getRecruiterProfile, insertProfile } = require("../Controllers/recruiterController");
const { postJob } = require("../Controllers/jobController");

const router = express.Router();

router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);
router.get('/jobs/filter', getFilteredJobs);
router.post("/post-job", postJob);
router.get("/recruiter-profile", getRecruiterProfile);
router.post("/recruiter/update-profile", insertProfile);

// Route to store Job Seeker data
router.post('/jobseeker', storeJobSeeker);

// Route to store Recruiter data
router.post('/recruiter', storeRecruiter);

// Route to login
router.post('/login', loginUser);

// Premium functionality routes
router.get('/check-premium/:number', checkPremium);
router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;