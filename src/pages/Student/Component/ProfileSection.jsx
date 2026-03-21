import React from 'react';

// Component ย่อย: แสดงรายการข้อมูล
const ProfileItem = ({ label, value }) => (
  // items-baseline: จัดให้บรรทัดแรกของข้อความตรงกัน
  // whitespace-nowrap ที่ Label: ป้องกันหัวข้อตัดคำ
  <div className="flex items-baseline gap-3 mb-3 text-sm text-gray-800">
    {/* 🛑 แก้ไข: เปลี่ยน font-bold เป็น font-medium เพื่อให้ตัวหนังสือดูบางลงที่ 100% */}
    <div className="w-32 md:w-48 text-right font-medium text-gray-700 flex-shrink-0 whitespace-nowrap">
      {label} :
    </div> 
    <div className="font-normal break-words flex-grow">
      {value || "-"}
    </div>
  </div>
);

function ProfileSection() {
  // 🔸 ข้อมูลส่วนตัว
  const personalData = {
    id: "65080502241",
    name: "นายพัสมันต์ ทองอุทัย (MR.PASSAMANT THONGUTHAI)", // ชื่อยาวจะแสดงผลบรรทัดเดียวได้สวยขึ้น
    degree: "ปริญญาตรี",
    faculty: "คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี",
    dept: "ภาควิชาครุศาสตร์ไฟฟ้า",
    type: "ปริญญาตรี 5 ปี",
    plan: "ปกติ",
    major: "วิศวกรรมคอมพิวเตอร์",
    minor: "-",
    status: "ปกติ",
    idCard: "XXXXXXXXXXXXX",
    sex: "ชาย"
  };

  // 🛑 ข้อมูลสถานศึกษา
  const educationData = [
    { label: "ชื่อสถานศึกษา", value: "-" }, 
    { label: "หมายเลขสถานศึกษา", value: "-" },
    { label: "อาจารย์พี่เลี้ยง", value: "-" },
    { label: "วิชาที่สอน", value: "-" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto pt-8 pb-12 px-4 md:px-8"> 
      
      {/* 1. ส่วนรูปโปรไฟล์ */}
      <div className="flex justify-center mb-10">
        <div className="w-36 h-36 bg-gray-200 rounded-md overflow-hidden relative shadow-sm">
           <svg className="w-full h-full text-gray-400 absolute top-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
        </div>
      </div>
      
      {/* 2. ส่วนข้อมูลรายละเอียด */}
      <div> 
        
        {/* ใช้ Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-1">
          
          {/* --- โซนข้อมูลยาว (ให้กินพื้นที่เต็ม 2 ช่อง เพื่อไม่ให้บรรทัดตก) --- */}
          <div className="lg:col-span-2">
            <ProfileItem label="รหัสนักศึกษา" value={personalData.id} />
          </div>

          <div className="lg:col-span-2">
            <ProfileItem label="ชื่อ - สกุล" value={personalData.name} />
          </div>

          <div className="lg:col-span-2">
            <ProfileItem label="ระดับการศึกษา" value={personalData.degree} />
          </div>

          {/* --- โซนข้อมูลคู่ (แบ่งซ้าย-ขวา) --- */}
          {/* แถว 1: คณะ / ภาควิชา */}
          <ProfileItem label="คณะ" value={personalData.faculty} />
          <ProfileItem label="ภาค/สาขาวิชา" value={personalData.dept} />

          {/* แถว 2: ประเภท / แผน */}
          <ProfileItem label="ประเภทนักศึกษา" value={personalData.type} />
          <ProfileItem label="แผน" value={personalData.plan} />

          {/* แถว 3: วิชาเอก / วิชาโท */}
          <ProfileItem label="วิชาเอก" value={personalData.major} />
          <ProfileItem label="วิชาโท" value={personalData.minor} />

          {/* --- โซนข้อมูลสั้นอื่นๆ --- */}
          <div className="lg:col-span-2">
            <ProfileItem label="สถานภาพการศึกษา" value={personalData.status} />
          </div>

          <div className="lg:col-span-2">
            <ProfileItem label="หมายเลขบัตรประชาชน" value={personalData.idCard} />
          </div>

          <div className="lg:col-span-2">
            <ProfileItem label="เพศ" value={personalData.sex} />
          </div>
          
        </div>

        {/* --- Divider --- */}
        <hr className="border-t border-gray-300 my-8 mx-4 md:mx-0 opacity-70" />

        {/* --- ข้อมูลสถานศึกษา --- */}
        <div>
            {/* 🛑 แก้ไข: ปรับ Header เป็น font-semibold ให้สอดคล้องกัน */}
            <h3 className="text-gray-900 font-semibold text-lg mb-6 pl-4 md:pl-0">
                ข้อมูลสถานศึกษา
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-1">
                 <div className="lg:col-span-2 space-y-1">
                    {educationData.map((item, index) => (
                        <ProfileItem key={index} label={item.label} value={item.value} />
                    ))}
                 </div>
            </div>
        </div>

      </div>
    </div>
  );
}

export default ProfileSection;