import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

// ------------------- STUDENT IMPORTS -------------------
import StudentLayout from "./pages/Student/Layout"; 
import StudentHomePage from "./pages/Student/HomePage";
import StudentFilePage from "./pages/Student/FilePage";
import StudentActivityPage from "./pages/Student/ActivityPage";

// ------------------- TEACHER IMPORTS -------------------
import TeacherLayout from "./pages/Teacher/TeacherLayout";
import TeacherHomePage from "./pages/Teacher/TeacherHomePage";
import TeacherFilePage from "./pages/Teacher/TeacherFilePage";
import TeacherActivityPage from "./pages/Teacher/TeacherActivityPage";

// ------------------- OFFICER IMPORTS -------------------
import OfficerLayout from "./pages/Officer/OfficerLayout";
import OfficerHomePage from "./pages/Officer/OfficerHomePage";
import OfficerFilePage from "./pages/Officer/OfficerFilePage";
import OfficerActivityPage from "./pages/Officer/OfficerActivityPage";
import OfficerMemberPage from "./pages/Officer/OfficerMemberPage"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Login Page (Root) */}
        <Route path="/" element={<LoginPage />} />

        {/* 2. Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<StudentHomePage />} />
          <Route path="files" element={<StudentFilePage />} />
          <Route path="activity" element={<StudentActivityPage />} />
        </Route>

        {/* 3. Teacher Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<TeacherHomePage />} />
          <Route path="files" element={<TeacherFilePage />} />
          <Route path="activity" element={<TeacherActivityPage />} />
        </Route>

        {/* 4. Officer Routes */}
        <Route path="/officer" element={<OfficerLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<OfficerHomePage />} />
          <Route path="files" element={<OfficerFilePage />} />
          <Route path="activity" element={<OfficerActivityPage />} /> 
          <Route path="member" element={<OfficerMemberPage />} />
          <Route path="teachers" element={<OfficerMemberPage />} />
          <Route path="students" element={<OfficerMemberPage />} />
        </Route>

        <Route path="*" element={<div className="p-10 text-center">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;