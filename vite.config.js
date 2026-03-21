import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Import ปลั๊กอิน Tailwind

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()], // เพิ่ม tailwindcss() เข้าไปใน array ของ plugins
});
