const supabase = require("../config/supabaseClient");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "yuvarajavr20@gmail.com",
        pass: "evau bfsl qymi bghm", // Replace with your Google App Password
    },
});

const appliedjob = async (req, res) => {
    try {
        const {
            email, applicant_id, job_id, username, phone, dob, education,
            skills, experience, languages, resume, declaration
        } = req.body;

        console.log("Applying for job with email:", email);

        // Insert application into Supabase
        const { data, error } = await supabase
            .from("appliedjobs")
            .insert([{ 
                email, applicant_id, job_id, username, phone, dob, education,
                skills, experience, languages, resume, declaration
            }]);

        if (error) throw error;
        console.log("Application submitted successfully!");

        // Send confirmation email to applicant
        const mailOptions = {
            from: "yuvarajavr20@gmail.com",
            to: email,
            subject: "Job Application Submitted Successfully",
            html: `
                <p>Dear ${username},</p>
                <p>Thank you for applying for the job. Here are your application details:</p>
                <ul>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Date of Birth:</strong> ${dob}</li>
                    <li><strong>Education:</strong> ${education}</li>
                    <li><strong>Skills:</strong> ${skills}</li>
                    <li><strong>Experience:</strong> ${experience}</li>
                    <li><strong>Languages:</strong> ${languages}</li>
                    <li><strong>Resume:</strong> ${resume}</li>
                    <li><strong>Declaration:</strong> ${declaration}</li>
                </ul>
                <p>Your job application has been successfully submitted.</p>
                <p>Best Regards,</p>
                <p>JobHive Team</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent to applicant:", email);

        res.status(201).json({ success: true, message: "Application submitted successfully", data });
    } catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { appliedjob };
