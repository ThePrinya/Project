import React from 'react';

// ======================================================================
// 🧩 ส่วนประกอบ: ProfileItem (ใช้สำหรับเรียงข้อมูลใน Profile)
// ======================================================================
const ProfileItem = ({ label, value }) => (
  <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 mb-4 md:mb-3 text-sm text-gray-800 justify-center md:justify-start">
    
    {/* Label: ชิดซ้ายและเป็นตัวหนาบนมือถือ / ชิดขวาและจำกัดความกว้างบน Desktop */}
    <div className="w-full md:w-40 lg:w-56 text-left md:text-right font-bold md:font-medium text-[#1F384C] md:text-gray-700 flex-shrink-0 whitespace-nowrap">
      {label} <span className="hidden md:inline">:</span>
    </div> 
    
    {/* Value: ขยับเข้ามานิดนึงบนมือถือ (pl-2) */}
    <div className="font-normal break-words flex-grow max-w-sm text-left pl-2 md:pl-0">
      {value || "-"}
    </div>
  </div>
);

// ======================================================================
// 🧩 ส่วนประกอบ: ProfileSection
// ======================================================================
function ProfileSection() {
  // 🔸 ข้อมูล Profile ของ Officer (ยึดตามข้อมูลเดิมเป๊ะๆ ไม่มีการเปลี่ยนแปลง)
  const officerData = [
    { label: "รหัสนักศึกษา", value: "นาย" }, 
    { label: "ชื่อ - สกุล", value: "นายพัสมันต์ ทองอุทัย (MR.PASSAMANT THONGUTHAI)" },
    { label: "ตำแหน่ง", value: "หัวหน้าแผนก" },
    { label: "อีเมล", value: "xxxx158@kmutt.ac.th" },
    { label: "หมายเลขโทรศัพท์สำนักงาน", value: "027065086" },
    { label: "หมายเลขโทรศัพท์มือถือ", value: "0990864424" },
    { label: "หมายเลขบัตรประชาชน", value: "XXXXXXXXXXXXX" },
    { label: "เพศ", value: "ชาย" },
  ];

  return (
    <div className="w-full h-full pt-4 sm:pt-8 pb-12 px-2 sm:px-4"> 
      
      {/* 🔸 รูปโปรไฟล์ (Silhouette) */}
      <div className="flex justify-center mb-8 sm:mb-10">
        {/* ปรับขนาดย่อลงบนมือถือ และขยายปกติบนจอใหญ่ */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-500 rounded-md overflow-hidden flex items-center justify-center shadow-sm relative transition-all duration-300">
          <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </div>
      
      {/* 🔸 รายละเอียดข้อมูล */}
      <div className="flex flex-col items-center w-full"> 
        <div className="w-full max-w-3xl">
            {officerData.map((item, index) => (
                <ProfileItem key={index} label={item.label} value={item.value} />
            ))}
        </div>
      </div>

    </div>
  );
}

export default ProfileSection;