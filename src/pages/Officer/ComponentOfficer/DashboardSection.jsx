import React from 'react';

function DashboardSection({ className }) {
  // Mock Data สำหรับ Officer (งานเอกสาร/อนุมัติ)
  const assignments = {
    submitted: ["รายงานสรุปยอดประจำเดือน", "ตรวจสอบเอกสารขอเบิกงบ"],
    notSubmitted: ["อนุมัติคำร้องนักศึกษา", "ประชุมแผนงานภาคเรียนหน้า", "ประเมินผลการปฏิบัติงาน"],
  };

  return (
    // 🛑 ปรับสีพื้นหลังเป็น #E2F7FC ตามที่ขอ
    <div className={`bg-[#E2F7FC] rounded-xl p-6 shadow-md ${className} flex flex-col`}> 
      
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-gray-700">DashBoard</h3>
        <a href="#" className="text-sm text-blue-500 hover:text-blue-700 font-medium">
          View Report
        </a>
      </div>
      <p className="text-xs text-gray-400 mb-4">From 1-6 Dec, 2020</p>

      {/* 🔸 วงกลม Chart */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full flex items-center justify-center relative"
          style={{
            background: `conic-gradient(
              #1e40af 0% 40%, 
              #f59e0b 40% 72%, 
              #dc2626 72% 100%
            )`
          }}
        >
          {/* Inner Circle: ปรับสีให้ตรงกับพื้นหลังการ์ด (#E2F7FC) */}
          <div className="w-20 h-20 bg-[#E2F7FC] rounded-full absolute shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]"></div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-around text-center text-xs mb-6 border-b border-gray-200 pb-4">
        
        {/* 1. Submitted (40%) */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-800 flex-shrink-0"></span>
            <span className="font-medium text-gray-700">Submitted</span> 
          </div>
          <span className="text-base text-blue-800 font-normal">40%</span> 
        </div>
        
        {/* 2. Late Submission (32%) */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 flex-shrink-0"></span>
            <span className="font-medium text-gray-700">Late Submission</span>
          </div>
          <span className="text-base text-yellow-500 font-normal">32%</span>
        </div>
        
        {/* 3. Not Submitted (28%) */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 flex-shrink-0"></span>
            <span className="font-medium text-gray-700">Not Submitted</span>
          </div>
          <span className="text-base text-red-600 font-normal">28%</span>
        </div>
      </div>

      {/* ส่วนรายการงาน */}
      <div className="flex-grow flex flex-col gap-4">
        
        {/* Assignment: Not Submitted */}
        <div>
          <h4 className="text-red-600 font-medium mb-2">Not Submitted ({assignments.notSubmitted.length})</h4>
          {/* ปรับสีพื้นหลังรายการย่อยให้กลืนไปกับพื้นหลังหลัก หรือใช้สีขาวจางๆ */}
          <div className="bg-white/60 rounded-md p-3"> 
            <ul className="text-sm text-gray-700 space-y-1">
              {assignments.notSubmitted.map((item, i) => (
                <li key={i}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Assignment: Submitted */}
        <div>
          <h4 className="text-blue-800 font-medium mb-2">Submitted ({assignments.submitted.length})</h4>
          <div className="bg-white/60 rounded-md p-3"> 
            <ul className="text-sm text-gray-700 space-y-1">
              {assignments.submitted.map((item, i) => (
                <li key={i}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}

export default DashboardSection;