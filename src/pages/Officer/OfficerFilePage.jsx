import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  Image as ImageIcon, 
  FileText, 
  Table, 
  Video, 
  Plus,
  UploadCloud,
  X,
  File
} from 'lucide-react';

// =========================================================================================
// 🧩 Helper Function: เลือกไอคอนและสีตามประเภทไฟล์
// =========================================================================================
const getFileIcon = (type) => {
  switch (type) {
    case 'folder':
      return { icon: <Folder className="w-5 h-5 text-gray-500" />, bg: 'bg-gray-200' };
    case 'image':
      return { icon: <ImageIcon className="w-5 h-5 text-white" />, bg: 'bg-cyan-400' }; 
    case 'doc':
      return { icon: <FileText className="w-5 h-5 text-white" />, bg: 'bg-blue-400' }; 
    case 'csv':
      return { icon: <Table className="w-5 h-5 text-white" />, bg: 'bg-green-400' }; 
    case 'video':
      return { icon: <Video className="w-5 h-5 text-white" />, bg: 'bg-red-400' }; 
    default:
      return { icon: <FileText className="w-5 h-5 text-gray-500" />, bg: 'bg-gray-100' };
  }
};

// =========================================================================================
// 🧩 Component ย่อย: Upload Modal (Pop-up อัปโหลดไฟล์)
// =========================================================================================
const UploadModal = ({ isOpen, onClose }) => {
  
  // 🌟 ระบบจัดกึ่งกลางอัจฉริยะ (Dynamic Centering) 
  useEffect(() => {
    if (!isOpen) return;
    const root = document.getElementById('file-page-root');
    const wrapper = document.getElementById('upload-modal-wrapper');
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
  }, [isOpen]);

  // ปิด Modal เมื่อกดปุ่ม ESC บนคีย์บอร์ด
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      
      {/* 🛑 Backdrop (พื้นหลังสีดำโปร่งใส) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" 
        onClick={onClose}
      ></div>

      {/* 🛑 Centering Wrapper (ตัวคำนวณระยะกึ่งกลางหลบ Sidebar) */}
      <div 
        id="upload-modal-wrapper" 
        className="absolute inset-y-0 flex items-center justify-center p-3 sm:p-4 pointer-events-none"
      >
        {/* 🛑 Modal Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden transform animate-fadeIn pointer-events-auto flex flex-col max-h-[92vh]">
          
          {/* Header */}
          <div className="flex justify-between items-center p-5 sm:p-6 border-b border-gray-100">
            <h3 className="text-lg sm:text-xl font-bold text-[#1F384C] flex items-center gap-2">
               <UploadCloud className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
               Upload Files
            </h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Body - Drag & Drop Zone */}
          <div className="p-5 sm:p-8 overflow-y-auto custom-scrollbar">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl sm:rounded-3xl bg-[#F8FAFC] hover:bg-[#F0F7FF] hover:border-blue-400 transition-all flex flex-col items-center justify-center py-10 sm:py-12 px-4 cursor-pointer group">
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white shadow-sm text-blue-500 rounded-full flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 group-hover:text-blue-600 transition-transform duration-300">
                <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              
              <p className="text-lg sm:text-xl font-bold text-gray-700 mb-1 sm:mb-2 text-center">
                 Drag & Drop your files here
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 text-center px-4">
                 or click to browse from your computer
              </p>
              
              <button className="bg-white border border-gray-200 text-[#1F384C] px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-center gap-2 text-sm sm:text-base">
                <File className="w-4 h-4" />
                Browse Files
              </button>

            </div>
            
            <div className="mt-5 sm:mt-6 text-[10px] sm:text-xs font-medium text-gray-400 text-center">
              Supported formats: PDF, DOCX, XLSX, JPG, PNG, MP4 (Max size: 100MB)
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 sm:p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
            <button 
              onClick={onClose} 
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button className="bg-[#1F384C] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:bg-[#2a4966] transition-transform hover:scale-105 active:scale-95 text-sm sm:text-base">
              Upload Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

// =========================================================================================
// 🏠 Main Page Component (OfficerFilePage)
// =========================================================================================
function OfficerFilePage() {
  
  // State สำหรับควบคุมการเปิด/ปิด Pop-up อัปโหลดไฟล์
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // --- Mock Data ---
  const files = [
    { id: 1, name: 'เอกสารการยื่นขอฝึกงาน', type: 'folder', filesize: '13.68 gb', created: '12 Feb 2022', owner: 'Shuichi Akai', ownerColor: 'bg-red-500', modified: '1 days ago' },
    { id: 2, name: 'เอกสารประจำตัวนักศึกษา', type: 'folder', filesize: '10.53 mb', created: '14 Feb 2022', owner: 'Shuichi Akai', ownerColor: 'bg-red-500', modified: '2 days ago' },
    { id: 3, name: 'ประเมินการฝึกสอนนักศึกษา', type: 'folder', filesize: '2.89 mb', created: '19 Feb 2022', owner: 'Jodie Starling', ownerColor: 'bg-yellow-500', modified: '5 days ago' },
    { id: 4, name: 'เอกสารประกอบการสอน', type: 'folder', filesize: '69.35 mb', created: '27 Feb 2022', owner: 'Shuichi Akai', ownerColor: 'bg-red-500', modified: '8 days ago' },
    { id: 5, name: 'รวมภาพการสอน .jpg', type: 'image', filesize: '78.77 mb', created: '13 Mar 2022', owner: 'Furuya Rei', ownerColor: 'bg-indigo-500', modified: '14 days ago' },
    { id: 6, name: 'panel 1 image.jpg', type: 'image', filesize: '9.87 gb', created: '13 Mar 2022', owner: 'Furuya Rei', ownerColor: 'bg-indigo-500', modified: '14 days ago' },
    { id: 7, name: 'branding details.doc', type: 'doc', filesize: '9.21 mb', created: '06 Apr 2022', owner: 'James Black', ownerColor: 'bg-gray-700', modified: '24 days ago' },
    { id: 8, name: 'store 1 dataset.csv', type: 'csv', filesize: '63.84 mb', created: '07 May 2022', owner: 'Furuya Rei', ownerColor: 'bg-indigo-500', modified: '1 month ago' },
    { id: 9, name: 'promotion video.mp4', type: 'video', filesize: '9.65 mb', created: '11 Jul 2022', owner: 'Furuya Rei', ownerColor: 'bg-indigo-500', modified: '2 month ago' },
    { id: 10, name: 'Not you lyrics.doc', type: 'doc', filesize: '10.95 mb', created: '12 Jul 2022', owner: 'Andre Camel', ownerColor: 'bg-orange-400', modified: '2 month ago' },
  ];

  return (
    // 🛑 สังเกต id="file-page-root" จุดอ้างอิงให้ Modal เล็งเพื่อจัดกึ่งกลาง
    <div id="file-page-root" className="h-full flex flex-col relative min-h-screen pb-20 font-sans px-1">
      
      {/* Container หลัก */}
      <div className="w-full">

        {/* 1. Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1F384C] mb-6 sm:mb-8">File Storage</h1>

        {/* 2. File Table (Responsive) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto w-full custom-scrollbar">
          
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
                     
                     {/* Col 1: Asset Name */}
                     <div className="col-span-4 flex items-center gap-3 sm:gap-4 pl-4 sm:pl-6 py-3 sm:py-4 border-r border-gray-100 h-full">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bg} shadow-sm`}>
                          {icon}
                        </div>
                        <span className="font-bold text-gray-700 text-xs sm:text-sm truncate">{file.name}</span>
                     </div>

                     {/* Col 2: File size */}
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

      {/* 4. Floating Action Button (Responsive) */}
      <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-40">
        <button 
          onClick={() => setIsUploadModalOpen(true)} 
          className="bg-[#555F6D] text-white pl-4 pr-1 sm:pl-6 sm:pr-2 py-1.5 sm:py-2 rounded-xl shadow-xl flex items-center gap-2 sm:gap-4 hover:bg-[#434c59] transition-transform hover:scale-105 active:scale-95 group"
        >
          <span className="font-bold text-[10px] sm:text-xs tracking-wide uppercase">Upload File</span>
          <div className="w-7 h-7 sm:w-9 sm:h-9 bg-[#F59E0B] rounded-lg flex items-center justify-center shadow-sm group-hover:bg-[#d97706] transition-colors">
             <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[3]" />
          </div>
        </button>
      </div>

      {/* 🛑 นำ Component UploadModal มาวางไว้ด้านล่างสุด */}
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />

    </div>
  );
}

export default OfficerFilePage;