import React from 'react';

const About = () => {
  return (
    <div className="bg-[#9CDAD8] min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Image */}
        <div className="md:w-1/2 relative">
          <img 
            src="https://i.pinimg.com/originals/42/36/d0/4236d00b6df31c5c1dab3566fa61ff3c.gif" 
            alt="Job Portal" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>

        {/* Right Side - Content */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-zinc-500 mb-4">Welcome to JHire</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            JHire is your gateway to endless career opportunities. Our platform is designed to connect top recruiters with skilled professionals, streamlining the hiring process to make job searching and recruitment faster and more efficient.
          </p>
          <ul className=" pl-5 text-gray-600 mb-4 space-y-2">
            <li><span className="font-semibold">For Job Seekers:</span> Explore thousands of job opportunities and apply with ease.</li>
            <li><span className="font-semibold">For Recruiters:</span> Find the best talent, post jobs, and manage applications effortlessly.</li>
            <li><span className="font-semibold">Application Tracking:</span> Keep track of all job applications and hiring progress in one place.</li>
          </ul>
          <p className="text-gray-600 font-semibold mb-4">
            Whether you're a job seeker looking for your dream job or a recruiter seeking top talent, JHire is here to support you.
          </p>
          <h2 className='text-[#9CDAD8] text-center text-3xl font-bold'>"Your Next Hire, Your Dream Job,<br/>  One Click Away."</h2>
          
        </div>
      </div>
    </div>
  );
};

export default About;
