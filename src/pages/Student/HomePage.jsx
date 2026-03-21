// src/pages/Student/HomePage.jsx
import DashboardSection from './Component/DashboardSection'; 
import ProfileContent from './Component/ProfileContent';   

function HomePage() {
return (
  <div className="h-full"> {/* ใช้ h-full เพื่อให้คอนเทนเนอร์หลักสูงเต็มที่ */}

    {/* 🔸 Layout 2 Columns สำหรับจัดวางเนื้อหาหลักของหน้า Home ตามรูปภาพ */}
    {/* 🛑 เพิ่ม h-full ใน grid container เพื่อให้คอลัมน์ยืดความสูงได้ */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full"> 

      {/* คอลัมน์ซ้าย: ส่วน Profile (ใช้ 2/3) */}
      {/* 🛑 ต้องเพิ่ม h-full เพื่อให้ div นี้สูงเต็มพื้นที่ของ grid row */}
      <div className="lg:col-span-2 space-y-6 h-full">
        {/* ProfileContent ที่มี ProfileSection อยู่ด้านใน */}
         {/* 🛑 ส่ง h-full class ลงไปเป็น props */}
        <ProfileContent className="h-full" /> 
      </div> 

      {/* คอลัมน์ขวา: Dashboard (ใช้ 1/3) */}
       {/* 🛑 ต้องเพิ่ม h-full เพื่อให้ div นี้สูงเต็มพื้นที่ของ grid row */}
      <div className="lg:col-span-1 h-full">
        {/* แสดงสถิติการบ้าน/กิจกรรม */}
         {/* 🛑 ส่ง h-full class ลงไปเป็น props */}
        <DashboardSection className="h-full" /> 
       </div>
    </div>
  </div>
);
}

export default HomePage;