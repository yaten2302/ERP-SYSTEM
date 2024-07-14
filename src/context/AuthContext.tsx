import {
  checkStudentOrTeacher,
  concatTeacherSections,
  getAccount,
  getUserFromDB,
} from "@/lib/supabase/api";
import { student_type, teacher_type } from "@/types";

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
  isStudent: boolean;
  setIsStudent: React.Dispatch<React.SetStateAction<boolean>>;
  student: student_type;
  setStudent: React.Dispatch<React.SetStateAction<student_type>>;
  teacher: teacher_type;
  setTeacher: React.Dispatch<React.SetStateAction<teacher_type>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const InitialStudent = {
  name: "",
  email: "",
  section_name: "",
  enrollment_number: 0,
  academic_year: "",
  course_name: "",
};

const InitialTeacher = {
  name: "",
  email: "",
  section_name: [],
  course_name: "",
  academic_year: "",
  subject_name: "",
};

const InitialState = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isLoading: false,
  setIsLoading: () => {},
  checkAuthUser: async () => false as boolean,
  isStudent: false,
  setIsStudent: () => {},
  student: InitialStudent,
  setStudent: () => {},
  teacher: InitialTeacher,
  setTeacher: () => {},
};

const AuthContext = createContext<AuthContextType>(InitialState);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [student, setStudent] = useState<student_type>(InitialStudent);
  const [teacher, setTeacher] = useState<teacher_type>(InitialTeacher);

  //check if user is already logged in or not
  const checkAuthUser = async () => {
    setIsLoading(true);

    try {
      const { data } = await getAccount();

      if (data?.session?.user?.aud == "authenticated") {
        setIsAuthenticated(true);

        return true;
      } else {
        setIsAuthenticated(false);

        return false;
      }
    } catch (error) {
      console.log(error);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  //check if the logged in user is a student or teacher
  const checkStudent = async () => {
    const { data } = await getAccount();

    const student = await checkStudentOrTeacher(data.session.user.email);

    if (student) {
      setIsStudent(true);
      const getStudentFromDB = await getUserFromDB(
        data.session.user.email,
        true,
      );

      setStudent({
        name: getStudentFromDB[0].student_name,
        email: getStudentFromDB[0].student_email,
        section_name: getStudentFromDB[0].Sections.section_name,
        enrollment_number: getStudentFromDB[0].student_enroll_num,
        academic_year: getStudentFromDB[0].Sections.AcademicYear.year_name,
        course_name: getStudentFromDB[0].Sections.Courses.course_name,
      });

      return true;
    } else {
      setIsStudent(false);
      const getTeacherFromDB = await getUserFromDB(
        data.session.user.email,
        false,
      );

      const sectionsArray = await concatTeacherSections(getTeacherFromDB);

      setTeacher({
        name: getTeacherFromDB[0].Teachers.teacher_name,
        email: getTeacherFromDB[0].Teachers.teacher_email,
        section_name: sectionsArray,
        course_name: getTeacherFromDB[0].Sections.Courses.course_name,
        academic_year: getTeacherFromDB[0].Sections.AcademicYear.year_name,
        subject_name: getTeacherFromDB[0].Subjects.subject_name,
      });

      return false;
    }
  };

  useEffect(() => {
    const authenticate = async () => {
      const authenticated = await checkAuthUser();

      if (authenticated) {
        const _student = await checkStudent();
        if (_student) {
          navigate("/student");
        } else {
          navigate("/teacher");
        }
      } else {
        navigate("/sign-in");
      }
    };

    authenticate();
  }, [navigate]);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    checkAuthUser,
    isStudent,
    setIsStudent,
    student,
    setStudent,
    teacher,
    setTeacher,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUserContext = () => useContext(AuthContext);
