// src/pages/Student/Component/ProfileContent.jsx (แก้ไข)
import React from 'react';
import ProfileSection from './ProfileSection';

// 🛑 รับ props (รวมถึง className)
function ProfileContent({ className }) { 
return (
 // 🛑 คงกรอบสีขาวและเงาไว้ เพื่อให้เป็น "สี่เหลี่ยมที่ยาวจนเต็มหน้า"
 <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}> 
     {/* 🛑 เพิ่ม Title "Profile" กลับเข้ามาในกรอบหลัก */}
     <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2> 
 <ProfileSection />
 </div>
);
}

export default ProfileContent;