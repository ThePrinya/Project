import React from 'react';

// Component ย่อย:
// - ใช้ items-baseline ให้บรรทัดแรกตรงกัน
// - ใช้ font-medium ที่ label เพื่อให้ตัวหนังสือดูบางลงที่ 100% zoom (ตามที่ขอ)
const ProfileItem = ({ label, value }) => (
  <div className="flex items-baseline gap-3 mb-3 text-sm text-gray-800 justify-center md:justify-start">
    {/* ปรับ w-48 เพื่อให้ label มีพื้นที่พอและจัดชิดขวา */}
    <div className="w-40 md:w-56 text-right font-medium text-gray-700 flex-shrink-0 whitespace-nowrap">
      {label} :
    </div> 
    <div className="font-normal break-words flex-grow max-w-sm text-left">
      {value || "-"}
    </div>
  </div>
);

function ProfileSection() {
  // 🔸 ข้อมูล Profile ของ Teacher
  const teacherData = [
    { label: "รหัสเจ้าพนักงาน", value: "60054425223" }, // ตามรูปต้นฉบับ
    { label: "ชื่อ - สกุล", value: "นายพัสมันต์ ทองอุทัย (MR.PASSAMANT THONGUTHAI)" },
    { label: "ตำแหน่ง", value: "อาจารย์ที่ปรึกษา" },
    { label: "อีเมล", value: "xxxx158@kmutt.ac.th" },
    { label: "หมายเลขโทรศัพท์สำนักงาน", value: "027065086" },
    { label: "หมายเลขโทรศัพท์มือถือ", value: "0990864424" },
    { label: "หมายเลขบัตรประชาชน", value: "XXXXXXXXXXXXX" },
    { label: "เพศ", value: "ชาย" },
  ];

  return (
    <div className="w-full h-full pt-8 pb-12 px-4"> 
      
      {/* 🔸 รูปโปรไฟล์ (Silhouette) */}
      <div className="flex justify-center mb-10">
        <div className="w-40 h-40 bg-gray-500 rounded-md overflow-hidden flex items-center justify-center shadow-sm relative">
          {/* ใช้รูป SVG สีเทาเข้ม */}
          <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </div>
      
      {/* 🔸 รายละเอียดข้อมูล (แบบคอลัมน์เดียว) */}
      <div className="flex flex-col items-center w-full"> 
        <div className="w-full max-w-3xl">
            {teacherData.map((item, index) => (
                <ProfileItem key={index} label={item.label} value={item.value} />
            ))}
        </div>
      </div>

    </div>
  );
}

export default ProfileSection;