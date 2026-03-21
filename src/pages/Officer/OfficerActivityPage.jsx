import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, XCircle, MapPin, Upload, FileText, X, Edit, BookOpen } from 'lucide-react'; 

// =========================================================================================
// 📂 [1] ข้อมูลจำลอง (Mock Data - สำหรับ Officer)
// =========================================================================================
const allActivityData = {
  term1: [
    { id: 1, title: 'ตรวจสอบเอกสารเบิกจ่ายวัสดุ', location: 'ห้องพัสดุ 101', status: 'Submitted', color: 'text-blue-600', icon: CheckCircle, dueDate: '15 Aug 2023' },
    { id: 2, title: 'อนุมัติคำร้องลาพักการศึกษา', location: 'ระบบทะเบียนออนไลน์', status: 'Submitted', color: 'text-blue-600', icon: CheckCircle, dueDate: '20 Aug 2023' },
    { id: 3, title: 'สรุปวาระการประชุมประจำเดือน', location: 'ห้องประชุม 2 (อาคาร CB2)', status: 'LateSubmit', color: 'text-yellow-500', icon: Clock, dueDate: '30 Sep 2023' },
    { id: 4, title: 'จัดเตรียมเอกสารประเมินคุณภาพ', location: 'สำนักงานคณบดี', status: 'LateSubmit', color: 'text-yellow-500', icon: Clock, dueDate: '15 Oct 2023' },
  ],
  term2: [
    { id: 5, title: 'ตรวจสอบคุณสมบัติทุนการศึกษา', location: 'ห้องกิจการนักศึกษา', status: 'Submitted', color: 'text-blue-600', icon: CheckCircle, dueDate: '10 Jan 2024' },
    { id: 6, title: 'รวบรวมเกรดเฉลี่ยรายวิชา', location: 'ระบบทะเบียนออนไลน์', status: 'NotSubmitted', color: 'text-red-500', icon: XCircle, dueDate: '15 Feb 2024' },
    { id: 7, title: 'ประสานงานโครงการ Open House', location: 'ลานอเนกประสงค์ ชั้น 1', status: 'NotSubmitted', color: 'text-red-500', icon: XCircle, dueDate: '20 Feb 2024' },
    { id: 8, title: 'จัดทำรายงานงบประมาณประจำปี', location: 'ห้องธุรการ', status: 'NotSubmitted', color: 'text-red-500', icon: XCircle, dueDate: '28 Feb 2024' },
    { id: 9, title: 'บันทึกข้อมูลครุภัณฑ์ใหม่', location: 'ห้องพัสดุ', status: 'Submitted', color: 'text-blue-600', icon: CheckCircle, dueDate: '05 Mar 2024' },
    { id: 10, title: 'เตรียมการประชุมวิชาการ', location: 'หอประชุมใหญ่', status: 'LateSubmit', color: 'text-yellow-500', icon: Clock, dueDate: '10 Mar 2024' },
    { id: 11, title: 'ตรวจสอบใบลางานบุคลากร', location: 'ระบบ HR', status: 'NotSubmitted', color: 'text-red-500', icon: XCircle, dueDate: '15 Mar 2024' },
    { id: 12, title: 'สรุปยอดนักศึกษาเข้าใหม่', location: 'ระบบทะเบียน', status: 'NotSubmitted', color: 'text-red-500', icon: XCircle, dueDate: '30 Mar 2024' },
  ],
};

// 🛑 ปรับชื่อสถานะให้เข้ากับบริบทของ Officer
const statusFilters = [
  { label: 'ทั้งหมด', value: 'All', colorClass: 'text-gray-800', icon: BookOpen },
  { label: 'เสร็จสิ้น', value: 'Submitted', colorClass: 'text-blue-600', icon: CheckCircle }, 
  { label: 'กำลังดำเนินการ', value: 'LateSubmit', colorClass: 'text-yellow-600', icon: Clock },  
  { label: 'รอดำเนินการ', value: 'NotSubmitted', colorClass: 'text-red-600', icon: XCircle },     
];

const termFilters = [
  { id: 'term2', title: 'ภาคการศึกษา 2 / 2567', subtitle: 'Jan - May' },
  { id: 'term1', title: 'ภาคการศึกษา 1 / 2567', subtitle: 'Aug - Dec' },
];

// =========================================================================================
// 🪟 [2] หน้าต่าง Pop-up รายละเอียดงาน (Task Modal)
// =========================================================================================
const TaskModal = ({ isVisible, onClose, activity }) => {
  
  // 🌟 ระบบจัดกึ่งกลางอัจฉริยะ (Dynamic Centering) 
  useEffect(() => {
    if (!isVisible) return;
    const root = document.getElementById('activity-page-root');
    const wrapper = document.getElementById('task-modal-wrapper');
    if (!root || !wrapper) return;

    const updateRect = () => {
      const domRect = root.getBoundingClientRect();
      wrapper.style.left = `${domRect.left}px`;
      wrapper.style.width = `${domRect.width}px`;
    };

    updateRect();
    const observer = new ResizeObserver(updateRect);
    observer.observe(root);
    window.addEventListener('resize', updateRect);

    return () => { observer.disconnect(); window.removeEventListener('resize', updateRect); };
  }, [isVisible]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isVisible || !activity) return null;
  
  const isPending = activity.status === 'NotSubmitted';

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose}></div>

      {/* Centering Wrapper */}
      <div id="task-modal-wrapper" className="absolute inset-y-0 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
        
        {/* Modal Container */}
        <div className="relative bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden transform transition-all animate-fadeIn max-h-[92vh] lg:max-h-[90vh] pointer-events-auto">
          
          <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-500 transition-colors bg-white/90 rounded-full p-2 z-50 shadow-sm border border-gray-100">
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="flex flex-col lg:flex-row w-full h-full overflow-y-auto lg:overflow-hidden custom-scrollbar">

            {/* --- ฝั่งซ้าย: ข้อมูลรายละเอียดงาน --- */}
            <div className="w-full lg:w-1/2 bg-blue-50/40 p-5 sm:p-8 lg:p-10 flex flex-col gap-4 sm:gap-6 overflow-visible lg:overflow-y-auto custom-scrollbar border-b lg:border-b-0 lg:border-r border-gray-100 h-auto lg:h-full">
              <div className="pr-10 lg:pr-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1F384C] mb-1.5 leading-tight break-words overflow-hidden">
                  {activity.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-500 font-medium break-words overflow-hidden flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {activity.location}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-5 border border-blue-100 shadow-sm space-y-3 sm:space-y-4">
                <div className="flex flex-row items-baseline sm:items-center gap-3">
                   <span className="text-xs lg:text-sm text-gray-400 w-20 lg:w-24 flex-shrink-0">สถานะงาน:</span>
                   <span className={`text-xs lg:text-sm font-bold ${activity.color} flex items-center gap-1.5 flex-wrap`}>
                     <activity.icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" />
                     {activity.status === 'Submitted' ? 'เสร็จสิ้น' : activity.status === 'LateSubmit' ? 'กำลังดำเนินการ' : 'รอดำเนินการ'}
                   </span>
                </div>
                <div className="flex flex-row items-baseline sm:items-center gap-3">
                   <span className="text-xs lg:text-sm text-gray-400 w-20 lg:w-24 flex-shrink-0">กำหนดการ:</span>
                   <span className="text-xs lg:text-sm font-bold text-gray-800 break-words">
                     {activity.dueDate}
                   </span>
                </div>
              </div>

              <div className="mb-2 lg:mb-0 flex-1">
                <h4 className="text-sm lg:text-base font-bold text-[#1F384C] mb-2 flex items-center gap-2 uppercase tracking-wide">
                  <FileText className="w-4 h-4 text-blue-500" /> รายละเอียดการปฏิบัติงาน
                </h4>
                <div className="text-xs lg:text-sm text-gray-600 bg-white/60 p-4 rounded-xl border border-gray-100 min-h-[60px] lg:min-h-[80px] leading-relaxed break-words">
                  กรุณาตรวจสอบเอกสารที่เกี่ยวข้องและอัปเดตสถานะการดำเนินการเข้าระบบเมื่อเสร็จสิ้นขั้นตอน (ข้อมูลจำลองสำหรับการทดสอบระบบของเจ้าหน้าที่)
                </div>
              </div>
            </div>

            {/* --- ฝั่งขวา: ส่วนสำหรับการดำเนินการ --- */}
            <div className="w-full lg:w-1/2 bg-white p-5 sm:p-8 lg:p-10 flex flex-col gap-5 sm:gap-6 overflow-visible lg:overflow-y-auto custom-scrollbar h-auto lg:h-full">
              <h3 className="text-lg lg:text-xl font-bold text-[#1F384C] mb-1">การจัดการเอกสาร/งาน</h3>
              
              {isPending ? (
                <div className="flex-1 flex flex-col gap-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 hover:bg-blue-50/30 hover:border-blue-300 transition-all flex flex-col items-center justify-center p-6 cursor-pointer flex-grow min-h-[140px] group">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-sm font-bold text-gray-700 text-center">แนบไฟล์ผลการดำเนินการ (ถ้ามี)</p>
                    <p className="text-[10px] lg:text-xs text-gray-400 mt-1 text-center">PDF, Word, Excel (ไม่เกิน 10MB)</p>
                  </div>
                  <button className="bg-[#1F384C] text-white py-3.5 sm:py-4 rounded-xl font-bold shadow-lg hover:bg-[#2a4966] transition-all hover:scale-[1.01] active:scale-[0.98] w-full text-sm sm:text-base mt-auto">
                    บันทึกการดำเนินการ
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-4">
                  <div className="bg-blue-50/30 rounded-xl p-3 sm:p-4 border border-blue-100 flex items-center gap-3">
                    <div className="bg-blue-600 p-2.5 rounded-lg shadow-sm flex-shrink-0">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">Approved_Document_V1.pdf</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 truncate">1.2 MB • อัปโหลดเมื่อ {activity.dueDate}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 flex flex-col gap-3">
                    <div className="text-[10px] sm:text-xs text-gray-400 text-center italic">บันทึกรายการล่าสุดเมื่อ: {activity.dueDate}</div>
                    <button className="bg-yellow-500 text-white py-3.5 sm:py-4 rounded-xl font-bold shadow-md hover:bg-yellow-600 transition-all w-full flex items-center justify-center gap-2 text-sm sm:text-base">
                      <Edit className="w-4 h-4" /> แก้ไขการดำเนินการ
                    </button>
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================================
// 📇 [3] การ์ดรายการกิจกรรม (Activity Card)
// =========================================================================================
const ActivityCard = ({ activity, onClick }) => {
  const { title, location, color, icon: IconComponent, dueDate } = activity;

  return (
    <div 
      className="flex items-center bg-white rounded-2xl shadow-sm p-3 sm:p-4 transition cursor-pointer border border-gray-100 hover:shadow-md hover:border-blue-200 group"
      onClick={() => onClick(activity)} 
    > 
      <div className={`flex-shrink-0 mr-3 sm:mr-4 p-2.5 sm:p-3 rounded-2xl ${color} bg-opacity-10 group-hover:scale-105 transition-transform`}>
        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800 mb-1 truncate text-sm sm:text-base">{title}</p>
        <div className="flex flex-col sm:flex-row sm:items-center text-[10px] sm:text-xs text-gray-500 gap-1 sm:gap-4">
            <span className="truncate flex items-center gap-1.5 font-medium">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {location}
            </span>
            <span className="truncate flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Due: {dueDate}
            </span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================================
// 🏠 [4] หน้าหลัก OfficerActivityPage
// =========================================================================================
function OfficerActivityPage() {
  const [selectedTerm, setSelectedTerm] = useState('term2'); 
  const [filterStatus, setFilterStatus] = useState('All'); 
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const currentActivities = allActivityData[selectedTerm] || [];
  const filteredActivities = currentActivities.filter(activity => {
    if (filterStatus === 'All') return true;
    return activity.status === filterStatus;
  });
  
  const handleCardClick = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  return (
    // 🛑 สังเกต id="activity-page-root" จุดนี้แหละที่ทำหน้าที่เป็นเป้าหมายให้ Modal ยิงเลเซอร์มาวัดระยะกว้าง/ยาว
    <div id="activity-page-root" className="min-h-screen relative z-0 pb-10 font-sans px-1"> 
      
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F384C] mb-6 sm:mb-8">Activity Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 h-full">
        
        {/* 1️⃣ ส่วนเลือกเทอม */}
        <div className="lg:col-span-1">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg font-bold text-[#1F384C] mb-2">Select Term</h2>
            {termFilters.map((filter) => {
              const isSelected = filter.id === selectedTerm;
              return (
                <div 
                  key={filter.id}
                  onClick={() => setSelectedTerm(filter.id)}
                  className={`p-4 sm:p-5 rounded-2xl shadow-sm cursor-pointer transition-all active:scale-[0.98] border-2
                    ${isSelected ? 'bg-blue-50 border-blue-400' : 'bg-white hover:bg-gray-50 border-transparent border-b-gray-100'}`}
                >
                  <p className="text-sm sm:text-base font-bold text-gray-800 mb-0.5">{filter.title}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">{filter.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2️⃣ ส่วนรายการกิจกรรม */}
        <div className="lg:col-span-2 lg:border-l lg:border-gray-100 lg:pl-8"> 
      
          <div className="flex space-x-2 sm:space-x-3 mb-6 overflow-x-auto pb-3 custom-scrollbar">
            {statusFilters.map(filter => {
              const isSelected = filterStatus === filter.value;
              const borderColorClass = filter.colorClass === 'text-gray-800' ? 'border-gray-400' : filter.colorClass.replace('text-', 'border-');
              
              return (
                <button 
                  key={filter.value}
                  onClick={() => setFilterStatus(filter.value)}
                  className={`flex items-center space-x-2 py-2 px-4 rounded-full text-[11px] sm:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 border-2
                    ${isSelected ? `bg-white ${borderColorClass} ${filter.colorClass} shadow-md` : `bg-white border-transparent hover:border-gray-200 text-gray-400`}`}
                >
                  <filter.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-3 sm:space-y-4 max-h-[60vh] lg:max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} onClick={handleCardClick} />
                ))
            ) : (
              <div className="p-10 sm:p-12 text-center text-gray-400 bg-white border border-dashed border-gray-200 rounded-2xl">
                ไม่พบข้อมูลกิจกรรม
              </div>
            )}
          </div>
        </div>
      </div>
      
      <TaskModal 
        isVisible={showModal} 
        onClose={() => setShowModal(false)} 
        activity={selectedActivity} 
      />

    </div>
  );
}

export default OfficerActivityPage;