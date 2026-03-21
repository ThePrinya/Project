import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom'; 
import { Menu, Home, FileText, Activity, LogOut } from 'lucide-react'; 

// ======================================================================
// 🧩 ส่วนประกอบ: SIES Logo (นำมาจาก Sidebar เดิม)
// ======================================================================
const SiesSidebarLogo = () => (
  <div className="flex flex-col items-center justify-center w-full h-full pt-2">
    <div className="flex h-6 items-end justify-center gap-x-[2px] mb-1"> 
      <div className="w-1 bg-yellow-500 h-full"></div> 
      <div className="w-0.5 bg-yellow-500 h-full"></div> 
      <div className="w-1.5 bg-yellow-500 h-full"></div> 
      <div className="w-1 bg-yellow-500 h-full"></div> 
      <div className="w-2 bg-yellow-500 h-full"></div> 
      <div className="w-0.5 bg-yellow-500 h-full"></div> 
      <div className="w-2.5 bg-yellow-500 h-full"></div> 
      <div className="w-1 bg-yellow-500 h-full"></div> 
      <div className="w-1 bg-yellow-500 h-full"></div> 
      <div className="w-1.5 bg-yellow-500 h-full"></div> 
      <div className="w-1 bg-yellow-500 h-full"></div> 
    </div>
    <h1 className="text-2xl font-extrabold tracking-[0.5em] text-yellow-500 leading-none text-center pl-3"> 
      SIES
    </h1>
  </div>
);

// ======================================================================
// 🧩 ส่วนประกอบ: Sidebar Component (รวมไว้ในไฟล์เดียวเพื่อแก้ปัญหา Import)
// ======================================================================
const navItems = [
  { text: 'Home', path: '/student/home', icon: Home },
  { text: 'File', path: '/student/files', icon: FileText }, 
  { text: 'Assessment Activity', path: '/student/activity', icon: Activity },
];

const MenuItem = ({ icon: Icon, text, path, isCollapsed }) => (
  <NavLink
    to={path}
    className={({ isActive }) => 
      `flex items-center space-x-3 p-3 rounded-md cursor-pointer transition 
      ${isActive ? 'bg-orange-500 text-white' : 'hover:bg-gray-600/70 text-gray-200'}
      ${isCollapsed ? 'justify-center space-x-0' : ''}` 
    }
    title={isCollapsed ? text : undefined}
  >
    <Icon className="w-5 h-5 flex-shrink-0" />
    <span className={`text-sm whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
      {text}
    </span> 
  </NavLink>
);

function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  // 🛑 Responsive: บนมือถือเวลาปิด Sidebar ให้ความกว้างเป็น 0 (w-0) จะได้ซ่อนไปเลย, บน Desktop ให้เป็น w-20
  const widthClass = isOpen ? 'w-64' : 'w-0 md:w-20'; 
  const isCollapsed = !isOpen; 

  const handleLogout = () => navigate('/'); 

  return (
    // 🛑 Responsive: เพิ่ม overflow-hidden ป้องกันเนื้อหาล้นเวลา Sidebar หดเหลือ w-0 บนมือถือ
    <div className={`${widthClass} bg-gray-700 text-white flex flex-col min-h-screen fixed top-0 left-0 z-30 transition-all duration-300 overflow-hidden shadow-2xl md:shadow-none`}>
      
      <div className={`flex items-center justify-center border-b border-gray-600 transition-all duration-300
        ${isCollapsed ? 'h-16 px-2' : 'h-20 px-4'}`}>
        {!isCollapsed ? (
           <SiesSidebarLogo />
        ) : (
           <span className="text-yellow-500 font-bold tracking-widest text-lg hidden md:block">SIES</span>
        )}
      </div>

      <div className={`p-4 space-y-1 overflow-x-hidden ${isCollapsed ? 'px-2' : 'px-4'} flex-1`}>
        {!isCollapsed && <h3 className="text-xs font-bold uppercase text-gray-400 mb-2">Menu</h3>}
        {navItems.map((item) => (
          <MenuItem 
            key={item.path} 
            icon={item.icon} 
            text={item.text} 
            path={item.path} 
            isCollapsed={isCollapsed} 
          />
        ))}
      </div>
      
      <div className={`p-4 border-t border-gray-600 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <button
          onClick={handleLogout}
          // 🛑 เปลี่ยนเป็น text-gray-200 เพื่อให้กลมกลืนกับเมนูอื่น และคง hover สีแดงไว้
          className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer transition w-full text-gray-200 hover:bg-red-500/20 hover:text-red-400
          ${isCollapsed ? 'justify-center space-x-0' : ''}`}
          title="Logout"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className={`text-sm whitespace-nowrap font-medium transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 🔔 ส่วนประกอบ: Notification Panel 
// ----------------------------------------------------------------------
const NotificationPanel = () => {
  const [activeTab, setActiveTab] = useState('all');

  const sampleNotifications = [
    { id: 1, text: 'Jarn James อย่าลืมส่งงานจ้าเด็กๆ', time: '6 ชั่วโมง' },
    { id: 2, text: 'Teacher Tawan แจ้งเตือนสำหรับนักศึกษาที่ชอบกินบุหรี่', time: '1 สัปดาห์' },
  ];
  
  const filteredNotifications = activeTab === 'all' ? sampleNotifications : sampleNotifications.filter(n => n.id === 1); 

  return (
    <div className="absolute right-0 mt-2 w-[90vw] sm:w-80 max-w-sm bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-200 origin-top-right">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 flex justify-between items-center">
          การแจ้งเตือน
        </h3>
      </div>
      
      <div className="flex p-4 space-x-2 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('all')} 
          className={`px-3 py-1 text-sm rounded-full transition ${activeTab === 'all' ? 'bg-orange-100 text-orange-700 font-semibold' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          ทั้งหมด
        </button>
        <button 
          onClick={() => setActiveTab('unread')} 
          className={`px-3 py-1 text-sm rounded-full transition ${activeTab === 'unread' ? 'bg-orange-100 text-orange-700 font-semibold' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          ยังไม่ได้อ่าน
        </button>
      </div>

      <div className="py-2 max-h-96 overflow-y-auto">
        <div className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500">วันนี้</div>
        
        {filteredNotifications.map(n => (
          <div key={n.id} className="flex items-start p-3 hover:bg-gray-50 cursor-pointer transition">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-orange-500">
              🔔
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 leading-snug break-words">{n.text}</p>
              <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
            </div>
          </div>
        ))}
        
        <div className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 flex justify-between items-center">
          <span>ก่อนหน้านี้</span>
          <a href="#" className="text-sm text-orange-600 hover:underline">ดูทั้งหมด</a>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 🏠 Main Layout Component
// ----------------------------------------------------------------------
function Layout() { 
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 🛑 Responsive: ขนาดของตัวดัน (Spacer) ให้ตรงกับ Sidebar (ซ่อนบนมือถือถ้าปิด)
  const sidebarWidthClass = isSidebarOpen ? 'w-64' : 'w-0 md:w-20';

  return (
    <div className="flex bg-gray-100 min-h-screen">
      
      <Sidebar isOpen={isSidebarOpen} />
      
      {/* 🛑 Responsive Overlay: กดพื้นที่ว่างเพื่อปิด Sidebar บนมือถือ */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Spacer เพื่อดันเนื้อหาหลัก (Content) ให้ไม่โดน Sidebar ทับ */}
      <div className={`${sidebarWidthClass} flex-shrink-0 transition-all duration-300`}></div> 

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        
        <header className="flex justify-between items-center p-3 sm:p-4 bg-white shadow-md relative z-10">
          
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full text-gray-700 hover:bg-gray-200 transition"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* User Profile */}
            <div 
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition"
              onClick={() => navigate('/student/home')} 
            >
              <span className="hidden sm:block text-gray-700 font-medium truncate max-w-[150px] lg:max-w-none">
                Rick Sanchase
              </span> 
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-sm flex-shrink-0">
                R
              </div>
            </div>

            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-full transition relative ${showNotifications ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {/* Red Dot */}
                <span className="absolute top-1.5 right-1.5 sm:right-2 block h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full ring-2 ring-white bg-red-500"></span>
              </button>
              
              {showNotifications && <NotificationPanel />}
            </div>

          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}
export default Layout;