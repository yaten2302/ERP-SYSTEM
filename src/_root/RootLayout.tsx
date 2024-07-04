import { useUserContext } from "@/context/AuthContext";
import { StudentHome, TeacherHome } from "./pages";

const RootLayout = () => {
  const { isStudent } = useUserContext();

  return <>{isStudent ? <StudentHome /> : <TeacherHome />}</>;
};

export default RootLayout;
