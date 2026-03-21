import React from 'react';
import { useNavigate } from 'react-router-dom';

// --------------------------------------------------------------------------------
// 1. แก้ไขเส้นทาง (Path) การนำเข้าไฟล์ภาพ Asset
// --------------------------------------------------------------------------------
import LoginImage from '../assets/LoginImage.jpg'; 

function LoginPage() {
  const navigate = useNavigate();
  const BACKGROUND_IMAGE = LoginImage; 

  const handleLogin = (e) => {
    e.preventDefault(); 
    // 🛑 แก้ไขจุดนี้: เปลี่ยนจาก '/home' เป็น '/student/home'
    // เพื่อให้ตรงกับ Route ที่ตั้งไว้ใน App.jsx
    navigate('/student/home');
  };

  return (
    // Container หลัก: เต็มจอ, Background Image, Flex Layout
    <div
      className="h-screen w-screen bg-cover bg-center flex justify-start items-start pt-0" 
      style={{ backgroundImage: `url('${BACKGROUND_IMAGE}')` }} 
    >
    
      {/* Login Panel */}
      <div className="w-full max-w-[370px] md:max-w-[420px] h-full bg-[#1F384C]/75 
          flex flex-col justify-start items-center px-10 shadow-2xl 
          md:ml-16 lg:ml-26">
      
        {/* GROUP 1: Logo/Header (S I E S) */}
        <div className="pt-35 pb-10 w-full max-w-sm"> 
          {/* Barcode/Logo SIES */}
          <div className="flex justify-center mb-2"> 
            <div className="flex h-14 overflow-hidden"> 
              <div className="w-[4px] bg-yellow-500 mr-[4px]"></div> 
              <div className="w-[2px] bg-yellow-500 mr-[4px]"></div> 
              <div className="w-[6px] bg-yellow-500 mr-[4px]"></div> 
              <div className="w-[4px] bg-yellow-500 mr-[4px]"></div> 
              <div className="w-[8px] bg-yellow-500 mr-[4px]"></div> 
              <div className="w-[2px] bg-yellow-500 mr-[4px]"></div> 
              <div className="w-[10px] bg-yellow-500 mr-[4px]"></div> 
              <div className="w-[6px] bg-yellow-500 mr-[4px]"></div> 
              <div className="w-[4px] bg-yellow-500 mr-[4px]"></div> 
              <div className="w-[2px] bg-yellow-500 mr-[4px]"></div> 
              <div className="w-[8px] bg-yellow-500 mr-[4px]"></div> 
              <div className="w-[6px] bg-yellow-500 mr-[4px]"></div> 
              <div className="w-[4px] bg-yellow-500 mr-[4px]"></div> 
              <div className="w-[10px] bg-yellow-500 mr-[4px]"></div> 
            </div>
          </div>
          {/* ข้อความ SIES */}
          <p className="text-3xl font-mid tracking-[0.2em] text-yellow-500 text-center"> 
            S I E S
          </p>
        </div>

        {/* GROUP 2: Login Title + Username Input */}
        <div className="py-4 w-full max-w-sm">
          <h2 className="text-2xl text-white font-bold mb-4 text-left">Login</h2>
          <input
            type="text"
            placeholder="UserName"
            className="px-4 py-3 rounded-md border-none bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 shadow-sm w-full"
          />
        </div>

        {/* GROUP 3: Password Input + Forget Password Link */}
        <div className="py-10 w-full max-w-sm flex flex-col gap-2">
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-md border-none bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 shadow-sm w-full"
          />
          <div className="text-right">
            <a href="#" className="text-sm text-gray-300 hover:text-yellow-400 transition">Forget Password?</a>
          </div>
        </div>

        {/* GROUP 4: Log in Button */}
        <div className="pt-6 w-full max-w-sm">
          <button 
            type="submit" 
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-md transition shadow-lg w-full"
            onClick={handleLogin}
          >
            Log in
          </button>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;