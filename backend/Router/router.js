const getJobs = require('../Controllers/getJobs');
const getJobById = require('../Controllers/getJobById');
const express = require('express');
const { getFilteredJobs } = require('../Controllers/getFilteredJobs');
const { storeJobSeeker, storeRecruiter,getRecruiterDetailsById } = require('../Controllers/userController');
const { loginUser } = require('../Controllers/loginController');
const { checkPremium, createCheckoutSession } = require("../Controllers/Premiumdata");
const { postJob,deleteJobById ,editJobById} = require("../Controllers/jobController");
const { appliedjob } = require("../Controllers/jobapply");
const { getJobsByR_Id } = require('../Controllers/getJobsByR_Id');
const { getProfile} = require('../Controllers/ProfileController');

const router = express.Router();

router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);
router.get('/jobs/filter', getFilteredJobs);
router.delete('/jobs/:id', deleteJobById);
router.put('/jobs/:id', editJobById);


router.post("/post-job", postJob);
router.get("/getRecruiterDetails/:id", getRecruiterDetailsById);

// Route to store Job Seeker data
router.post('/jobseeker', storeJobSeeker);

// Route to store Recruiter data
router.post('/recruiter', storeRecruiter);
router.get('/recruiter/:recruiter_id', getJobsByR_Id);
// Route to login
router.post('/login', loginUser);

// Premium functionality routes
router.get('/check-premium/:number', checkPremium);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/appliedjob", appliedjob);

router.get('/profile/:email', getProfile);

module.exports = router;