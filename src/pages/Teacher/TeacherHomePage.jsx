import React from 'react';
import { User } from 'lucide-react';

// ======================================================================
// 🧩 ส่วนประกอบ: ProfileItem (ใช้สำหรับเรียงข้อมูลใน Profile)
// ======================================================================
const ProfileItem = ({ label, value }) => (
  <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 mb-4 md:mb-3 text-sm text-gray-800">
    <div className="w-full md:w-56 text-left md:text-right font-bold md:font-medium text-[#1F384C] md:text-gray-700 flex-shrink-0">
      {label} <span className="hidden md:inline">:</span>
    </div> 
    <div className="font-normal break-words flex-grow max-w-full text-left text-gray-700 md:text-gray-800 pl-2 md:pl-0">
      {value || "-"}
    </div>
  </div>
);

// ======================================================================
// 🧩 ส่วนประกอบ: ProfileSection (ข้อมูลส่วนตัวของอาจารย์)
// ======================================================================
function ProfileSection() {
  const teacherData = [
    { label: "รหัสเจ้าพนักงาน", value: "60054425223" },
    { label: "ชื่อ - สกุล", value: "นายพัสมันต์ ทองอุทัย (MR.PASSAMANT THONGUTHAI)" },
    { label: "ตำแหน่ง", value: "อาจารย์ที่ปรึกษา" },
    { label: "อีเมล", value: "xxxx158@kmutt.ac.th" },
    { label: "หมายเลขโทรศัพท์สำนักงาน", value: "027065086" },
    { label: "หมายเลขโทรศัพท์มือถือ", value: "0990864424" },
    { label: "หมายเลขบัตรประชาชน", value: "XXXXXXXXXXXXX" },
    { label: "เพศ", value: "ชาย" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto pt-6 md:pt-8 pb-12 px-2 sm:px-4 md:px-8"> 
      <div className="flex justify-center mb-8 md:mb-10">
        <div className="w-32 h-32 md:w-36 md:h-36 bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center shadow-sm transition-all duration-300">
           <User className="w-16 h-16 text-gray-400" />
        </div>
      </div>
      <div className="bg-gray-50/50 md:bg-transparent p-4 md:p-0 rounded-xl max-w-3xl mx-auto"> 
        <div className="flex flex-col">
            {teacherData.map((item, index) => (
                <ProfileItem key={index} label={item.label} value={item.value} />
            ))}
        </div>
      </div>
    </div>
  );
}

// ======================================================================
// 🧩 ส่วนประกอบ: ProfileContent (กรอบขาวและ Title ของ Profile)
// ======================================================================
function ProfileContent({ className }) { 
  return (
    <div className={`bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col ${className}`}> 
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Profile</h2> 
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <ProfileSection />
      </div>
    </div>
  );
}

// ======================================================================
// 🧩 ส่วนประกอบ: DashboardSection (แผงควบคุมและสถิติการตรวจงาน)
// ======================================================================
function DashboardSection({ className }) {
  const assignments = {
    graded: ["งานเจ๊สมร อมรรัตนโกสินทร์", "โปรเจกต์จบ (บทที่ 1-3)"],
    pending: ["งาน Gen ที่ติด F", "งานจารย์พร"],
  };

  return (
    <div className={`bg-[#E2F7FC] rounded-xl p-4 sm:p-6 shadow-md flex flex-col ${className}`}> 
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-gray-700 text-base sm:text-lg">DashBoard</h3>
        <a href="#" className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 font-medium">
          View Report
        </a>
      </div>
      <p className="text-xs text-gray-400 mb-4 sm:mb-6">From 1-6 Dec, 2020</p>
      
      {/* กราฟโดนัทจำลอง */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full relative flex items-center justify-center transition-all duration-300"
          style={{
            background: `conic-gradient(#1e40af 0% 50%, #dc2626 50% 100%)`
          }}
        >
           <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E2F7FC] rounded-full absolute shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] transition-all duration-300"></div>
        </div>
      </div>

      {/* ป้ายกำกับกราฟ */}
      <div className="flex flex-wrap justify-around gap-y-4 text-center text-xs mb-6 border-b border-gray-200 pb-4">
        <div className="flex flex-col items-center w-1/2 sm:w-auto">
          <div className="flex items-center gap-1 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-800 flex-shrink-0"></span>
            <span className="font-medium text-gray-700 text-[10px] sm:text-xs">ตรวจแล้ว</span> 
          </div>
          <span className="text-sm sm:text-base text-blue-800 font-normal">50%</span> 
        </div>
        <div className="flex flex-col items-center w-1/2 sm:w-auto">
          <div className="flex items-center gap-1 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 flex-shrink-0"></span>
            <span className="font-medium text-gray-700 text-[10px] sm:text-xs">รอตรวจ</span>
          </div>
          <span className="text-sm sm:text-base text-red-600 font-normal">50%</span> 
        </div>
      </div>

      {/* รายการงาน */}
      <div className="flex-grow flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar">
        <div>
          <h4 className="text-blue-800 font-medium mb-2 text-sm sm:text-base">ตรวจแล้ว ({assignments.graded.length})</h4>
          <div className="bg-white/60 rounded-md p-2 sm:p-3"> 
            <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
              {assignments.graded.map((item, i) => (
                <li key={i} className="truncate">- {item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h4 className="text-red-600 font-medium mb-2 text-sm sm:text-base">รอตรวจ ({assignments.pending.length})</h4>
          <div className="bg-white/60 rounded-md p-2 sm:p-3"> 
            <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
              {assignments.pending.map((item, i) => (
                <li key={i} className="truncate">- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ======================================================================
// 🏠 Main Page Component: TeacherHomePage
// ======================================================================
function TeacherHomePage() {
  return (
    <div className="min-h-full"> 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[calc(100vh-8rem)]"> 
        {/* Profile อยู่ซ้าย (2 ส่วน) */}
        <div className="lg:col-span-2 h-full">
          <ProfileContent className="h-full" />
        </div> 
        {/* Dashboard อยู่ขวา (1 ส่วน) */}
        <div className="lg:col-span-1 h-full">
          <DashboardSection className="h-full" />
        </div>
      </div>
    </div>
  );
}

export default TeacherHomePage;