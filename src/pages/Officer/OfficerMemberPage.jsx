import React, { useState, useRef, useEffect } from 'react';
import { User, ChevronDown, Check, Plus, X } from 'lucide-react';

// =========================================================================================
// 🧩 ส่วนที่ 1: Custom Component (SmoothDropdown)
// =========================================================================================
const SmoothDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        // ปรับเป็น rounded-full เพื่อให้ขอบมนเหมือนในรูป
        className={`w-full sm:w-[280px] bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-full flex justify-between items-center focus:outline-none transition-all duration-200 hover:bg-gray-50 shadow-sm ${isOpen ? 'ring-2 ring-blue-200 border-blue-300' : ''}`}
      >
        <span className="truncate text-sm">{value}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div 
        className={`absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top ease-out
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
      >
        <div className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
          {options.map((option) => (
            <div 
              key={option}
              onClick={() => {
                onChange(option); 
                setIsOpen(false); 
              }}
              className={`px-4 py-3 text-sm cursor-pointer flex items-center justify-between transition-colors
                ${value === option ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span className="truncate">{option}</span>
              {value === option && <Check className="w-4 h-4 text-blue-600" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// =========================================================================================
// 🪟 ส่วนที่ 2: Modal (หน้าต่างเพิ่มสมาชิกใหม่)
// =========================================================================================
const AddMemberModal = ({ isVisible, onClose }) => {
  
  useEffect(() => {
    if (!isVisible) return;
    const root = document.getElementById('member-page-root');
    const wrapper = document.getElementById('add-member-modal-wrapper');
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose}></div>
      <div id="add-member-modal-wrapper" className="absolute inset-y-0 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
        <div className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transform transition-all animate-fadeIn pointer-events-auto p-6 sm:p-8 border border-white/40 max-h-[92vh] overflow-y-auto custom-scrollbar">
          
          <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-red-500 transition-colors z-20 bg-white/90 rounded-full p-2 shadow-sm border border-gray-100">
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <h2 className="text-xl sm:text-2xl font-bold text-[#1F384C] mb-6 border-b border-gray-100 pb-4 flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><User className="w-6 h-6" /></div>
            เพิ่มสมาชิกใหม่ (Add Member)
          </h2>

          <div className="flex flex-col gap-4 sm:gap-5 pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#1F384C]">รหัสประจำตัว (ID)</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-all" placeholder="เช่น 6508050xxxx" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#1F384C]">บทบาท (Role)</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-all cursor-pointer">
                  <option>Student</option>
                  <option>Teacher</option>
                  <option>Officer</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#1F384C]">ชื่อ-สกุล (Full Name)</label>
              <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-all" placeholder="ชื่อ และ นามสกุล" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#1F384C]">อีเมล (Email)</label>
              <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-all" placeholder="example@kmutt.ac.th" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#1F384C]">แผนก/ภาควิชา (Department)</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-all cursor-pointer">
                <option>Electrical Engineering Education</option>
                <option>Computer Engineering</option>
                <option>General Administration</option>
              </select>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors text-sm sm:text-base">
                ยกเลิก
              </button>
              <button className="bg-[#1F384C] text-white px-8 py-3 rounded-xl text-sm sm:text-base font-bold shadow-lg hover:bg-[#2a4966] transition-transform hover:scale-[1.02] active:scale-[0.98]">
                บันทึกสมาชิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================================
// 🏠 ส่วนที่ 3: Main Page Component (OfficerMemberPage)
// =========================================================================================
function OfficerMemberPage() {
  
  const [selectedDept, setSelectedDept] = useState('Electrical Engineering Education'); 
  const [selectedPosition, setSelectedPosition] = useState('All'); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [showAddModal, setShowAddModal] = useState(false);

  // --- 🗄️ Mock Data (ข้อมูลชุดเดียวกับในรูป) ---
  const allMembers = [
    { id: '65080502241', name: 'นายพัสมันต์ ทองอุทัย', email: 'passamant.tho@kmutt.ac.th', role: 'Student', dept: 'Electrical Engineering Education' },
    { id: '65080502242', name: 'นายสมชาย ใจดี', email: 'somchai.jai@kmutt.ac.th', role: 'Student', dept: 'Electrical Engineering Education' },
    { id: '65080502243', name: 'นางสาวสมหญิง จริงใจ', email: 'somying.jing@kmutt.ac.th', role: 'Student', dept: 'Electrical Engineering Education' },
    { id: 'T001', name: 'ดร.วิชาญ การไฟฟ้า', email: 'wichan.karn@kmutt.ac.th', role: 'Teacher', dept: 'Electrical Engineering Education' },
    { id: 'OFF001', name: 'Officer Morty', email: 'morty.off@kmutt.ac.th', role: 'Officer', dept: 'Electrical Engineering Education' },
    { id: 'OFF003', name: 'คุณอำนวย การศึกษา', email: 'amnuay.edu@kmutt.ac.th', role: 'Officer', dept: 'Electrical Engineering Education' },
  ];

  // กรองข้อมูล
  const filteredMembers = allMembers.filter(member => 
    (selectedDept === 'All' || member.dept === selectedDept) && 
    (selectedPosition === 'All' || member.role === selectedPosition) &&
    (member.name.toLowerCase().includes(searchQuery.toLowerCase()) || member.id.includes(searchQuery))
  );

  // ฟังก์ชันกำหนดสีของป้ายกำกับ Role
  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'Student': return 'bg-blue-100 text-blue-500';
      case 'Teacher': return 'bg-purple-100 text-purple-500';
      case 'Officer': return 'bg-orange-100 text-orange-500';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div id="member-page-root" className="h-full flex flex-col gap-6 font-sans relative min-h-[85vh] pb-20">
      
      {/* Title */}
      <h1 className="text-2xl sm:text-[28px] font-bold text-[#1F384C] mb-2 sm:mb-4">Member : People</h1>

      {/* 📌 ส่วนควบคุม: Filter & Search Section (ปรับตามรูป) */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 mb-2 lg:items-center">
        
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-8">
           {/* Dropdown เลือกแผนก */}
           <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="font-bold text-[#1F384C] sm:w-24 text-sm sm:text-base">Department</label>
              <SmoothDropdown 
                options={['All', 'Electrical Engineering Education', 'Computer Engineering']}
                value={selectedDept}
                onChange={setSelectedDept}
              />
           </div>

           {/* Dropdown เลือกตำแหน่ง */}
           <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="font-bold text-[#1F384C] sm:w-16 text-sm sm:text-base">Position</label>
              <SmoothDropdown 
                options={['All', 'Student', 'Teacher', 'Officer']}
                value={selectedPosition}
                onChange={setSelectedPosition}
              />
           </div>
        </div>

        {/* ช่องค้นหา */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:ml-auto">
          <label className="font-bold text-[#1F384C] sm:w-16 text-sm sm:text-base">Search</label>
          <div className="relative">
            <input 
              type="text"
              placeholder="Search by name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-full w-full sm:w-[240px] focus:outline-none text-sm transition-all focus:ring-2 focus:ring-blue-200 shadow-sm placeholder-gray-400"
            />
          </div>
        </div>

      </div>

      {/* 📌 ส่วนตารางแสดงข้อมูล (Responsive Table Section) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto w-full custom-scrollbar flex-grow">
        
        <div className="min-w-[700px]">
          
          {/* Header สีเทาเข้ม มีเส้นคั่น */}
          <div className="grid grid-cols-12 gap-0 bg-[#C4C4C4] text-sm font-bold text-gray-800 border-b border-gray-300">
             <div className="col-span-3 text-center py-4 border-r border-gray-300">ID</div>
             <div className="col-span-5 text-center py-4 border-r border-gray-300">Name</div>
             <div className="col-span-4 text-center py-4">Email</div>
          </div>

          {/* Body มีเส้นคั่น */}
          <div className="divide-y divide-gray-200">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div key={member.id} className="grid grid-cols-12 gap-0 items-center hover:bg-gray-50 transition duration-150">
                   
                   {/* Column 1: ID */}
                   <div className="col-span-3 text-gray-700 text-sm text-center py-4 border-r border-gray-200 h-full flex items-center justify-center">
                      {member.id}
                   </div>

                   {/* Column 2: Name + Badge */}
                   <div className="col-span-5 text-[#1F384C] text-sm text-center py-4 border-r border-gray-200 h-full flex items-center justify-center gap-2 px-2">
                      <span className="font-medium truncate">{member.name}</span>
                      <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold tracking-wide flex-shrink-0 ${getRoleBadgeStyle(member.role)}`}>
                          {member.role}
                      </span>
                   </div>

                   {/* Column 3: Email */}
                   <div className="col-span-4 text-gray-600 text-sm text-center py-4 h-full flex items-center justify-center px-2 truncate">
                      {member.email}
                   </div>

                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                 <div className="bg-gray-100 p-4 rounded-full mb-3"><User className="w-10 h-10 text-gray-400" /></div>
                 <p className="text-base font-bold text-gray-500">No members found</p>
                 <p className="text-xs text-gray-400 mt-1">ลองเปลี่ยนคำค้นหา หรือเปลี่ยนตัวกรองดูอีกครั้ง</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 🛑 Floating Action Button (เพิ่มสมาชิกใหม่) ยังคงไว้ให้ใช้งาน */}
      <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-40">
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#555F6D] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-xl flex items-center gap-2 sm:gap-3 hover:bg-[#434c59] transition-transform hover:scale-105 active:scale-95 group ring-offset-2 focus:ring-2 ring-[#555F6D]"
        >
          <span className="font-bold text-[10px] sm:text-xs tracking-wider uppercase">ADD MEMBER</span>
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg border-2 border-[#F59E0B] flex items-center justify-center bg-white/10 group-hover:bg-[#F59E0B] transition-colors">
             <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-[#F59E0B] group-hover:text-white transition-colors stroke-[3]" />
          </div>
        </button>
      </div>

      {/* เรียกใช้งาน Modal เพิ่มสมาชิก */}
      <AddMemberModal isVisible={showAddModal} onClose={() => setShowAddModal(false)} />

    </div>
  );
}

export default OfficerMemberPage;