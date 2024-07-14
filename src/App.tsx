import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import RootLayout from "./_root/RootLayout";
import { Attendance, StudentHome, TeacherHome } from "./_root/pages";
import "./index.css";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route path="/teacher" element={<TeacherHome />} />
          <Route path="/student" element={<StudentHome />} />
          <Route path="/attendance" element={<Attendance />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
