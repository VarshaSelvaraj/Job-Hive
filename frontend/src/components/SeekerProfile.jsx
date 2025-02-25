<div className="mt-10 w-full max-w-6xl flex flex-col md:flex-row gap-16">
  
  {/* Left Section - Profile Image & Details (1/4th width) */}
  <div className="flex flex-col items-center md:items-start w-full md:w-1/4">
    <img src="/profile-icon.png" alt="Profile" className="h-32 w-32 rounded-full border-4 border-gray-300" />
    <div className="mt-6 text-left space-y-2">
      <p className="text-lg font-medium text-gray-700"><strong>Username:</strong> {profile.username}</p>
      <p className="text-lg font-medium text-gray-700"><strong>Email:</strong> {profile.email}</p>
      <p className="text-lg font-medium text-gray-700"><strong>Phone:</strong> {profile.phone || "N/A"}</p>
    </div>
  </div>

  {/* Right Section - Applied Jobs (3/4th width) */}
  <div className="w-full md:w-3/4">
    {seeker_id && <SeekerAppliedJobs seeker_id={seeker_id} />}
  </div>

</div>
