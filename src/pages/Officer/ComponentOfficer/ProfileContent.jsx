import React from 'react';
import ProfileSection from './ProfileSection';

function ProfileContent({ className }) { 
  return (
    <div className={`bg-white rounded-3xl shadow-sm p-8 ${className}`}> 
        <h2 className="text-3xl font-bold text-[#1F384C] mb-8">Profile</h2> 
        <ProfileSection />
    </div>
  );
}

export default ProfileContent;