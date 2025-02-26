const getJobs = require('../Controllers/getJobs');
const getJobById = require('../Controllers/getJobById');
const express = require('express');
const { storeJobSeeker, storeRecruiter,getRecruiterDetailsById } = require('../Controllers/userController');
const { loginUser } = require('../Controllers/loginController');
const { checkPremium, createCheckoutSession } = require("../Controllers/Premiumdata");
const { postJob,deleteJobById ,editJobById} = require("../Controllers/jobController");
const { appliedjob } = require("../Controllers/jobapply");
const { getJobsByR_Id } = require('../Controllers/getJobsByR_Id');
const { getProfile} = require('../Controllers/ProfileController');
const { getAppliedJobsByS_Id } = require('../Controllers/getAppliedJobsByS_Id');
const { getJobApplicantsByJob_Id } = require('../Controllers/getJobApplicantsByJob_Id');

const router = express.Router();

// get all jobs
router.get('/jobs', getJobs);
// get jobs by id
router.get('/jobs/:id', getJobById);
// delete job by id
router.delete('/jobs/:id', deleteJobById);
// edit job by id
router.put('/jobs/:id', editJobById);

// posting a new job by recruiter
router.post("/post-job", postJob);
// get recruiter details by recuiter id
router.get("/getRecruiterDetails/:id", getRecruiterDetailsById);

// Route to store Job Seeker data
router.post('/jobseeker', storeJobSeeker);

// Route to store Recruiter data
router.post('/recruiter', storeRecruiter);
// get jobs by recruiter id to display in the recruiter dash board
router.get('/recruiter/:recruiter_id', getJobsByR_Id);

// Route to login
router.post('/login', loginUser);

// Premium functionality routes
router.get('/check-premium/:number', checkPremium);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/appliedjob", appliedjob);

// get the job seeker deatils by uisng email
router.get('/profile/:email', getProfile);

// getting the aplied jobs by using the seeker id
router.get('/applied-jobs/:id',getAppliedJobsByS_Id)

// getting the applicants deatils by uing the job id
router.get('/applicants/:id',getJobApplicantsByJob_Id)

module.exports = router;