import React from 'react';
import { 
  Folder, 
  Image as ImageIcon, 
  FileText, 
  Table, 
  Video, 
} from 'lucide-react';

// =========================================================================================
// 🧩 Helper Function: เลือกไอคอนและสีตามประเภทไฟล์
// =========================================================================================
const getFileIcon = (type) => {
  switch (type) {
    case 'folder': return { icon: <Folder className="w-5 h-5 text-gray-500" />, bg: 'bg-gray-200' };
    case 'image': return { icon: <ImageIcon className="w-5 h-5 text-white" />, bg: 'bg-cyan-400' }; 
    case 'doc': return { icon: <FileText className="w-5 h-5 text-white" />, bg: 'bg-blue-400' }; 
    case 'csv': return { icon: <Table className="w-5 h-5 text-white" />, bg: 'bg-green-400' }; 
    case 'video': return { icon: <Video className="w-5 h-5 text-white" />, bg: 'bg-red-400' }; 
    default: return { icon: <FileText className="w-5 h-5 text-gray-500" />, bg: 'bg-gray-100' };
  }
};

function StudentFilePage() {
  // ข้อมูล Mock Data
  const files = [
    { id: 1, name: 'เอกสารการเรียนการสอน', type: 'folder', size: '15.63 gb', created: '12 Feb 2022', owner: 'Shuichi Akai', ownerColor: 'bg-red-500', modified: '1 days ago' },
    { id: 2, name: 'รูปภาพการสอน.jpg', type: 'image', size: '15.91 gb', created: '13 Mar 2022', owner: 'Furuya Rei', ownerColor: 'bg-indigo-500', modified: '14 days ago' },
    { id: 3, name: 'branding details.doc', type: 'doc', size: '25.63 gb', created: '06 Apr 2022', owner: 'James Black', ownerColor: 'bg-gray-700', modified: '24 days ago' },
    { id: 4, name: 'Project Demo.mp4', type: 'video', size: '500 mb', created: '01 Feb 2024', owner: 'Group 5', ownerColor: 'bg-green-500', modified: '2 weeks ago' },
    { id: 5, name: 'Dataset Final.csv', type: 'csv', size: '2 mb', created: '05 Feb 2024', owner: 'Dr. Wichan', ownerColor: 'bg-blue-500', modified: '3 weeks ago' },
    { id: 6, name: 'Lecture Notes.docx', type: 'doc', size: '15 mb', created: '20 Jan 2024', owner: 'Me', ownerColor: 'bg-orange-500', modified: '1 week ago' },
  ];

  return (
    <div className="h-full flex flex-col relative min-h-screen pb-20 font-sans">
      <div className="w-full">
        {/* 🛑 Responsive: ขนาดย่อหัวข้อบนมือถือ (text-2xl) และจอใหญ่ (sm:text-3xl) */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1F384C] mb-6 sm:mb-8">File Storage</h1>

        {/* 🛑 Responsive: เพิ่ม overflow-x-auto เพื่อให้ตารางเลื่อนซ้าย-ขวาได้เมื่อหน้าจอแคบ */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto w-full custom-scrollbar">
          
          {/* กำหนด min-w-[800px] เพื่อการันตีว่าตารางจะไม่โดนบีบจนเละบนจอมือถือ */}
          <div className="min-w-[800px]">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-0 bg-gray-50 text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200">
               <div className="col-span-4 text-center py-3 sm:py-4 border-r border-gray-200">Asset Name</div>
               <div className="col-span-2 text-center py-3 sm:py-4 border-r border-gray-200">File Size</div> 
               <div className="col-span-2 text-center py-3 sm:py-4 border-r border-gray-200">Created</div>
               <div className="col-span-2 text-center py-3 sm:py-4 border-r border-gray-200">Owner</div>
               <div className="col-span-2 text-center py-3 sm:py-4">Last Modified</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {files.map((file) => {
                const { icon, bg } = getFileIcon(file.type);
                
                return (
                  <div key={file.id} className="grid grid-cols-12 gap-0 items-center hover:bg-gray-50 transition duration-150">
                     
                     <div className="col-span-4 flex items-center gap-3 sm:gap-4 pl-4 sm:pl-6 py-3 sm:py-4 border-r border-gray-100 h-full">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${bg}`}>
                          {icon}
                        </div>
                        <span className="font-medium text-gray-700 text-xs sm:text-sm truncate">{file.name}</span>
                     </div>
                     
                     <div className="col-span-2 text-gray-500 text-xs sm:text-sm font-medium pl-3 sm:pl-4 py-3 sm:py-4 border-r border-gray-100 h-full flex items-center">
                        {file.size}
                     </div>
                     
                     <div className="col-span-2 text-gray-500 text-xs sm:text-sm pl-3 sm:pl-4 py-3 sm:py-4 border-r border-gray-100 h-full flex items-center">
                        {file.created}
                     </div>
                     
                     <div className="col-span-2 flex items-center gap-2 pl-3 sm:pl-4 py-3 sm:py-4 border-r border-gray-100 h-full">
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] text-white font-bold flex-shrink-0 ${file.ownerColor}`}>
                          {file.owner.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-gray-600 text-xs sm:text-sm truncate">{file.owner}</span>
                     </div>
                     
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

export default StudentFilePage;