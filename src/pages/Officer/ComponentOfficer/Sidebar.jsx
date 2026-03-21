import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  BarChart2, 
  Presentation,
  LogOut 
} from 'lucide-react'; 

// ----------------------------------------------------------------------
// 🧩 Component ย่อย: SIES Logo (Sidebar Version - Wide & Compact)
// ----------------------------------------------------------------------
const SiesSidebarLogo = () => (
  // 🟢 Container หลัก:
  // - pt-2: ระยะห่างด้านบน
  // - w-full: กว้างเต็มพื้นที่
  <div className="flex flex-col items-center justify-center w-full h-full pt-2">
    
    {/* 🟢 ส่วนบาร์โค้ด (Barcode Lines):
        - h-6: ความสูงของบาร์โค้ด
        - gap-x-[2px]: ระยะห่างระหว่างเส้น
        - mb-1: ระยะห่างระหว่างบาร์โค้ดกับตัวหนังสือ
    */}
    <div className="flex h-6 items-end justify-center gap-x-[4.3px] mb-1"> 
      <div className="w-1 bg-yellow-500 h-full"></div> 
      <div className="w-0.5 bg-yellow-500 h-3/4"></div> 
      <div className="w-1.5 bg-yellow-500 h-full"></div> 
      <div className="w-1 bg-yellow-500 h-5/6"></div> 
      <div className="w-2 bg-yellow-500 h-full"></div> 
      <div className="w-0.5 bg-yellow-500 h-4/5"></div> 
      <div className="w-2.5 bg-yellow-500 h-full"></div> 
      <div className="w-1 bg-yellow-500 h-3/4"></div> 
      <div className="w-1 bg-yellow-500 h-full"></div> 
      <div className="w-1.5 bg-yellow-500 h-5/6"></div> 
      <div className="w-1 bg-yellow-500 h-full"></div> 
    </div>
    
    {/* 🟢 ส่วนตัวหนังสือ (Text SIES): 
        - text-2xl: ขนาดตัวอักษร
        - tracking-[0.5em]: ระยะห่างระหว่างตัวอักษร
        - pl-3: ดันไปทางขวาเล็กน้อยเพื่อชดเชย tracking
    */}
    <h1 className="text-2xl font-extrabold tracking-[0.5em] text-yellow-500 leading-none text-center pl-3"> 
      SIES
    </h1>
  </div>
);

// ----------------------------------------------------------------------
// Menu Items หลักของ Officer
// ----------------------------------------------------------------------
const navItems = [
  { text: 'Home', path: '/officer/home', icon: Home },
  { text: 'File', path: '/officer/files', icon: FileText }, 
  { text: 'Assessment Activity', path: '/officer/activity', icon: BarChart2 },
  { text: 'Member', path: '/officer/member', icon: Presentation },
];

const MenuItem = ({ icon: Icon, text, path, isCollapsed }) => (
  <NavLink
    to={path}
    className={({ isActive }) => 
      `flex items-center space-x-3 p-3 rounded-md cursor-pointer transition 
      ${isActive ? 'bg-orange-600 text-white' : 'hover:bg-gray-600/70 text-gray-200'}
      ${isCollapsed ? 'justify-center space-x-0' : ''}` 
    }
    title={isCollapsed ? text : undefined}
  >
    <Icon className="w-5 h-5" />
    {!isCollapsed && <span className="text-sm whitespace-nowrap">{text}</span>} 
  </NavLink>
);

function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  const widthClass = isOpen ? 'w-64' : 'w-20'; 
  const isCollapsed = !isOpen; 

  const handleLogout = () => {
    navigate('/'); // กลับไปหน้า Login
  };

  return (
    // คง bg-[#364153] ซึ่งเป็นสีเฉพาะของ Officer ไว้
    <div className={`${widthClass} bg-[#364153] text-white flex flex-col min-h-screen fixed top-0 left-0 z-10 transition-all duration-300`}>
      
      {/* 🛑 Header: เปลี่ยนเป็นโลโก้ SIES เต็มพื้นที่ (เหมือน Student/Teacher) */}
      <div className={`flex items-center justify-center border-b border-gray-600 transition-all duration-300
        ${isCollapsed ? 'h-16 px-2' : 'h-20 px-4'}`}>
        
        {/* แสดงโลโก้ใหญ่เมื่อเปิด Sidebar, แสดงชื่อย่อเมื่อปิด */}
        {!isCollapsed ? (
           <SiesSidebarLogo />
        ) : (
           <span className="text-yellow-500 font-bold tracking-widest text-lg">SIES</span>
        )}
      
      </div>

      {/* Menu หลัก */}
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

      {/* ส่วน Logout ด้านล่าง */}
      <div className={`p-4 border-t border-gray-600 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <button
          onClick={handleLogout}
          className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer transition w-full hover:bg-red-500/20 text-red-300 hover:text-red-200
          ${isCollapsed ? 'justify-center space-x-0' : ''}`}
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm whitespace-nowrap font-medium">Logout</span>}
        </button>
      </div>
      
    </div>
  );
}

export default Sidebar;