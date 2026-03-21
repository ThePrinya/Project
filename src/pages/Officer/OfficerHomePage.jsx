import React from 'react';
import DashboardSection from './ComponentOfficer/DashboardSection'; 
import ProfileContent from './ComponentOfficer/ProfileContent'; 

function OfficerHomePage() {
  return (
    <div className="h-full"> 
      {/* Grid Layout: ซ้าย (Profile) 60-70%, ขวา (Dashboard) 30-40% */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full"> 

        {/* Column 1: Profile (ใช้พื้นที่ 3 ส่วน ตาม Grid) */}
        <div className="lg:col-span-3 h-full">
          <ProfileContent className="h-full" /> 
        </div> 
      </div>
    </div>
  );
}

export default OfficerHomePage;