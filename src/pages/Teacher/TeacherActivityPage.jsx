import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, XCircle, BookOpen, Upload, FileText, X, Edit, Plus, Users, Calendar, Paperclip } from 'lucide-react'; 

// =========================================================================================
// 📁 [1] ข้อมูลจำลอง (Mock Data - Teacher Role) 
// =========================================================================================
const allActivityData = {
  term2: [
    { id: 1, title: 'งานเจ๊สมร อมรรัตนโกสินทร์', subject: 'วิชาการจัดการทั่วไป', status: 'Submitted', color: 'text-blue-600', icon: CheckCircle, dueDate: '15 Feb 2024', submittedCount: '45/50' },
    { id: 2, title: 'งาน Gen ที่ติด F', subject: 'General Education', status: 'NotSubmitted', color: 'text-red-500', icon: XCircle, dueDate: '28 Feb 2024', submittedCount: '5/50' },
    { id: 3, title: 'งานจารย์พร', subject: 'วิชาภาษาอังกฤษพื้นฐาน', status: 'NotSubmitted', color: 'text-red-500', icon: XCircle, dueDate: '01 Mar 2024', submittedCount: '10/40' },
    { id: 4, title: 'งานพี่สมชาย', subject: 'ปฏิบัติการคอมพิวเตอร์', status: 'LateSubmit', color: 'text-yellow-500', icon: Clock, dueDate: '10 Feb 2024', submittedCount: '38/40' },
    { id: 5, title: 'โปรเจกต์จบ (บทที่ 1-3)', subject: 'Senior Project', status: 'Submitted', color: 'text-blue-600', icon: CheckCircle, dueDate: '20 Jan 2024', submittedCount: '10/10' },
  ],
  term1: [
    { id: 6, title: 'แบบฝึกหัดท้ายบทที่ 1', subject: 'Calculus I', status: 'Submitted', color: 'text-blue-600', icon: CheckCircle, dueDate: '15 Aug 2023', submittedCount: '120/120' },
    { id: 7, title: 'รายงานกลุ่ม', subject: 'Physics', status: 'Submitted', color: 'text-blue-600', icon: CheckCircle, dueDate: '30 Sep 2023', submittedCount: '30/30' },
  ],
};

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
// 🪟 [2] หน้าต่าง Pop-up รายละเอียดงาน (Task Modal) - รูปแบบเดียวกับ Student เป๊ะ
// =========================================================================================
const TaskModal = ({ isVisible, onClose, activity }) => {
  
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

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      
      {/* 1. แผ่นหลังสีดำเบลอ */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose}></div>

      {/* 2. กรอบวัดระยะกึ่งกลาง */}
      <div id="task-modal-wrapper" className="absolute inset-y-0 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
        
        {/* 3. กล่อง Pop-up หลัก */}
        <div className="relative bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transform transition-all animate-fadeIn max-h-[92vh] lg:max-h-[90vh] pointer-events-auto">
          
          <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-500 transition-colors bg-white/90 rounded-full p-2 z-50 shadow-sm border border-gray-100">
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="flex flex-col lg:flex-row w-full h-full overflow-y-auto lg:overflow-hidden custom-scrollbar">

            {/* --- ฝั่งซ้าย: ข้อมูลรายละเอียดงาน (UI เหมือน Student เป๊ะ) --- */}
            <div className="w-full lg:w-1/2 bg-blue-50/40 p-5 sm:p-8 lg:p-10 flex flex-col gap-4 sm:gap-6 overflow-visible lg:overflow-y-auto custom-scrollbar border-b lg:border-b-0 lg:border-r border-gray-100 h-auto lg:h-full">
              <div className="pr-10 lg:pr-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1F384C] mb-1.5 leading-tight break-words overflow-hidden">
                  {activity.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-500 font-medium break-words overflow-hidden">
                  {activity.subject}
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
                   <span className="text-xs lg:text-sm text-gray-400 w-20 lg:w-24 flex-shrink-0">กำหนดส่ง:</span>
                   <span className="text-xs lg:text-sm font-bold text-gray-800 break-words">
                     {activity.dueDate}
                   </span>
                </div>
              </div>

              <div className="mb-2 lg:mb-0 flex-1">
                <h4 className="text-sm lg:text-base font-bold text-[#1F384C] mb-2 flex items-center gap-2 uppercase tracking-wide">
                  <FileText className="w-4 h-4 text-blue-500" /> รายละเอียดงาน
                </h4>
                <div className="text-xs lg:text-sm text-gray-600 bg-white/60 p-4 rounded-xl border border-gray-100 min-h-[60px] lg:min-h-[80px] leading-relaxed break-words">
                  ข้อมูลตัวอย่างจำลองรายละเอียดงานที่อาจารย์มอบหมายให้นักศึกษาทำ
                </div>
              </div>
            </div>

            {/* --- ฝั่งขวา: การจัดการงานสำหรับอาจารย์ (UI ล้อตามกล่องอัปโหลดของ Student) --- */}
            <div className="w-full lg:w-1/2 bg-white p-5 sm:p-8 lg:p-10 flex flex-col gap-5 sm:gap-6 overflow-visible lg:overflow-y-auto custom-scrollbar h-auto lg:h-full">
              <h3 className="text-lg lg:text-xl font-bold text-[#1F384C] mb-1">ภาพรวมการส่งงาน</h3>
              
              <div className="flex-1 flex flex-col gap-4">
                {/* กล่องสรุปยอด (ดีไซน์เดียวกับ Upload Box ของ Student) */}
                <div className="border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 flex flex-col items-center justify-center p-6 flex-grow min-h-[140px]">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-sm font-bold text-gray-700 text-center">นักศึกษาที่ส่งงานแล้ว</p>
                  <p className="text-3xl font-extrabold text-[#1F384C] mt-2">{activity.submittedCount}</p>
                </div>
                
                {/* ปุ่มจัดการ (ดีไซน์เดียวกับปุ่มส่งงาน) */}
                <div className="mt-auto pt-2 flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-yellow-500 text-white py-3.5 sm:py-4 rounded-xl font-bold shadow-md hover:bg-yellow-600 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                    <Edit className="w-4 h-4" /> แก้ไขงาน
                  </button>
                  <button className="flex-1 bg-[#1F384C] text-white py-3.5 sm:py-4 rounded-xl font-bold shadow-lg hover:bg-[#2a4966] transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 text-sm sm:text-base">
                    <CheckCircle className="w-4 h-4" /> ตรวจงาน
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};


// =========================================================================================
// 🪟 [3] หน้าต่าง Pop-up สร้างกิจกรรม (Create Activity Modal)
// =========================================================================================
const CreateActivityModal = ({ isVisible, onClose }) => {
  
  useEffect(() => {
    if (!isVisible) return;
    const root = document.getElementById('activity-page-root');
    const wrapper = document.getElementById('create-modal-wrapper');
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

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0; cursor: pointer; position: absolute; left: 0; top: 0; width: 100%; height: 100%; margin: 0; padding: 0; z-index: 30;
        }
      `}</style>

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity pointer-events-auto" onClick={onClose}></div>

      <div id="create-modal-wrapper" className="absolute inset-y-0 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
        
        {/* ปรับดีไซน์ให้เหมือนกับ TaskModal (สีขาว, โค้งมน) */}
        <div className="relative bg-white w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transform transition-all animate-fadeIn max-h-[92vh] lg:max-h-[90vh] pointer-events-auto p-6 sm:p-8 lg:p-10">
          
          <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-500 transition-colors bg-white/90 rounded-full p-2 z-50 shadow-sm border border-gray-100">
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <h2 className="text-xl sm:text-2xl font-bold text-[#1F384C] mb-6 border-b border-gray-100 pb-4">
            สร้างกิจกรรมใหม่
          </h2>

          <div className="flex flex-col gap-4 sm:gap-5 overflow-y-auto custom-scrollbar pr-2">
            
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="text-sm sm:text-base font-bold text-[#1F384C]">ชื่องาน / หัวข้อ</label>
              <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-3.5 text-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-all" placeholder="เช่น ตรวจการบ้านบทที่ 5" />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2 relative">
              <label className="text-sm sm:text-base font-bold text-[#1F384C]">วันที่กำหนดส่ง</label>
              <div className="relative w-full">
                  <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-3.5 text-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-all text-center cursor-pointer relative z-10" />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-20">
                     <Calendar className="w-5 h-5" />
                  </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="text-sm sm:text-base font-bold text-[#1F384C]">รายละเอียด</label>
              <textarea rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-all resize-none" placeholder="ระบุรายละเอียดเพิ่มเติม..."></textarea>
            </div>

            <div className="w-full border-2 border-dashed border-gray-200 bg-gray-50 rounded-xl p-3 sm:p-4 h-24 flex items-center justify-center hover:bg-blue-50/50 hover:border-blue-300 transition-colors mt-2 cursor-pointer group">
               <div className="flex flex-col items-center gap-1">
                  <Paperclip className="w-6 h-6 text-gray-400 group-hover:text-blue-500 -rotate-45" />
                  <span className="text-xs text-gray-500 font-medium">แนบไฟล์ประกอบ (ถ้ามี)</span>
               </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
              <button className="bg-[#1F384C] text-white px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-bold shadow-lg hover:bg-[#2a4966] transition-transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                บันทึกกิจกรรม
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};


// =========================================================================================
// 📇 [4] การ์ดรายการกิจกรรม (Activity Card)
// =========================================================================================
const ActivityCard = ({ activity, onClick }) => {
  const { title, subject, color, icon: IconComponent, dueDate } = activity;

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
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {subject}
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
// 🏠 [5] หน้าหลัก TeacherActivityPage
// =========================================================================================
function TeacherActivityPage() {
  const [selectedTerm, setSelectedTerm] = useState('term2'); 
  const [filterStatus, setFilterStatus] = useState('All'); 
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const currentActivities = allActivityData[selectedTerm] || [];
  const filteredActivities = currentActivities.filter(activity => {
    if (filterStatus === 'All') return true;
    return activity.status === filterStatus;
  });
  
  const handleCardClick = (activity) => {
    setSelectedActivity(activity);
    setShowTaskModal(true);
  };

  return (
    <div id="activity-page-root" className="min-h-screen relative z-0 pb-10 font-sans px-1"> 
      
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F384C] mb-6 sm:mb-8">Activity (Teacher)</h1>

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

      {/* 🛑 Floating Action Button (สร้างกิจกรรม) */}
      <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-40">
        <button 
          onClick={() => setShowCreateModal(true)} 
          className="bg-[#555F6D] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-xl flex items-center gap-2 sm:gap-3 hover:bg-[#434c59] transition-all hover:scale-105 active:scale-95 ring-offset-2 focus:ring-2 ring-[#555F6D]"
        >
          <span className="font-bold text-[10px] sm:text-xs tracking-wider uppercase">CREATE ACTIVITY</span>
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg border-2 border-[#F59E0B] flex items-center justify-center bg-white/10">
             <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B] stroke-[3]" />
          </div>
        </button>
      </div>
      
      {/* เรียกใช้ Modals */}
      <TaskModal isVisible={showTaskModal} onClose={() => setShowTaskModal(false)} activity={selectedActivity} />
      <CreateActivityModal isVisible={showCreateModal} onClose={() => setShowCreateModal(false)} />

    </div>
  );
}

export default TeacherActivityPage;