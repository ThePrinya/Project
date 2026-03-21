import React from 'react';
import { 
  Folder, 
  Image as ImageIcon, 
  FileText, 
  Table, 
  Video 
} from 'lucide-react';

// =========================================================================================
// 🧩 Helper Function: เลือกไอคอนและสีตามประเภทไฟล์
// =========================================================================================
const getFileIcon = (type) => {
  switch (type) {
    case 'folder':
      return { icon: <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />, bg: 'bg-gray-200' };
    case 'image':
      return { icon: <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />, bg: 'bg-cyan-400' }; 
    case 'doc':
      return { icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />, bg: 'bg-blue-400' }; 
    case 'csv':
      return { icon: <Table className="w-5 h-5 sm:w-6 sm:h-6 text-white" />, bg: 'bg-green-400' }; 
    case 'video':
      return { icon: <Video className="w-5 h-5 sm:w-6 sm:h-6 text-white" />, bg: 'bg-red-400' }; 
    default:
      return { icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />, bg: 'bg-gray-100' };
  }
};

// =========================================================================================
// 🏠 Main Page Component (TeacherFilePage)
// =========================================================================================
function TeacherFilePage() {
  
  // --- Mock Data (ข้อมูลจำลองของอาจารย์) ---
  const files = [
    { id: 1, name: 'แผนการสอน (มคอ.3)', type: 'doc', filesize: '2.5 mb', created: '10 Jan 2024', owner: 'Teacher Rick', ownerColor: 'bg-orange-500', modified: '2 days ago' },
    { id: 2, name: 'ใบคะแนนสอบกลางภาค', type: 'csv', filesize: '500 kb', created: '15 Feb 2024', owner: 'Teacher Rick', ownerColor: 'bg-orange-500', modified: '5 days ago' },
    { id: 3, name: 'สื่อการสอน Slide บทที่ 1-8', type: 'folder', filesize: '1.2 gb', created: '01 Jan 2024', owner: 'Teacher Rick', ownerColor: 'bg-orange-500', modified: '1 week ago' },
    { id: 4, name: 'งานวิจัยสิ่งประดิษฐ์ AI', type: 'folder', filesize: '4.5 gb', created: '10 Dec 2023', owner: 'Dr. Strange', ownerColor: 'bg-purple-500', modified: '2 weeks ago' },
    { id: 5, name: 'บันทึกการประชุมภาควิชา', type: 'doc', filesize: '1.2 mb', created: '01 Mar 2024', owner: 'Admin', ownerColor: 'bg-gray-500', modified: '3 days ago' },
    { id: 6, name: 'รูปกิจกรรม Open House', type: 'image', filesize: '850 mb', created: '20 Feb 2024', owner: 'PR Team', ownerColor: 'bg-blue-500', modified: '1 month ago' },
    { id: 7, name: 'Video บันทึกการสอนย้อนหลัง', type: 'video', filesize: '15.6 gb', created: 'All Term', owner: 'Teacher Rick', ownerColor: 'bg-orange-500', modified: 'Yesterday' },
    { id: 8, name: 'รายชื่อนักศึกษาที่ติด F', type: 'csv', filesize: '120 kb', created: '28 Feb 2024', owner: 'Registrar', ownerColor: 'bg-green-600', modified: '3 weeks ago' },
  ];

  return (
    <div className="h-full flex flex-col relative min-h-screen pb-10 font-sans px-1">
      
      {/* 🛑 Container หลัก */}
      <div className="w-full">

        {/* 1. หัวข้อหน้า (Page Title) */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1F384C] mb-6 sm:mb-8">File Storage</h1>

        {/* 2. ตารางแสดงไฟล์ (File Table) 
            🛑 Responsive: เพิ่ม overflow-x-auto เพื่อให้ตารางเลื่อนซ้าย-ขวาได้เมื่อหน้าจอแคบ
        */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto w-full custom-scrollbar">
          
          {/* 🛑 Responsive: บังคับความกว้างขั้นต่ำ (min-w-[800px]) ไม่ให้คอลัมน์บีบกันเละ */}
          <div className="min-w-[800px]">
            
            {/* --- ส่วนหัวตาราง (Table Header) --- */}
            <div className="grid grid-cols-12 gap-0 bg-gray-50 text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200">
               <div className="col-span-4 text-center py-3 sm:py-4 border-r border-gray-200">Asset Name</div>
               <div className="col-span-2 text-center py-3 sm:py-4 border-r border-gray-200">File Size</div>
               <div className="col-span-2 text-center py-3 sm:py-4 border-r border-gray-200">Created</div>
               <div className="col-span-2 text-center py-3 sm:py-4 border-r border-gray-200">Owner</div>
               <div className="col-span-2 text-center py-3 sm:py-4">Last Modified</div>
            </div>

            {/* --- ส่วนเนื้อหาตาราง (Table Body) --- */}
            <div className="divide-y divide-gray-100">
              {files.map((file) => {
                const { icon, bg } = getFileIcon(file.type);
                
                return (
                  <div key={file.id} className="grid grid-cols-12 gap-0 items-center hover:bg-gray-50 transition duration-150">
                     
                     {/* Col 1: Asset Name */}
                     <div className="col-span-4 flex items-center gap-3 sm:gap-4 pl-4 sm:pl-6 py-3 sm:py-4 border-r border-gray-100 h-full">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bg} shadow-sm`}>
                          {icon}
                        </div>
                        <span className="font-bold text-gray-700 text-xs sm:text-sm truncate">{file.name}</span>
                     </div>

                     {/* Col 2: File Size */}
                     <div className="col-span-2 text-gray-500 text-xs sm:text-sm font-medium pl-3 sm:pl-4 py-3 sm:py-4 border-r border-gray-100 h-full flex items-center">
                        {file.filesize}
                     </div>

                     {/* Col 3: Created */}
                     <div className="col-span-2 text-gray-500 text-xs sm:text-sm pl-3 sm:pl-4 py-3 sm:py-4 border-r border-gray-100 h-full flex items-center">
                        {file.created}
                     </div>

                     {/* Col 4: Owner */}
                     <div className="col-span-2 flex items-center gap-2 pl-3 sm:pl-4 py-3 sm:py-4 border-r border-gray-100 h-full">
                        <div className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[9px] sm:text-xs text-white font-bold flex-shrink-0 ${file.ownerColor} shadow-sm`}>
                          {file.owner.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-gray-600 font-medium text-xs sm:text-sm truncate">{file.owner}</span>
                     </div>

                     {/* Col 5: Last Modified */}
                     <div className="col-span-2 flex items-center justify-start pl-3 sm:pl-4 py-3 sm:py-4 h-full">
                        <span className="text-gray-500 text-xs sm:text-sm">{file.modified}</span>
                     </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default TeacherFilePage;